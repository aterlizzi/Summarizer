let returnMsg;
let userSignedIn = false;

const CLIENT_ID = encodeURIComponent(
  "81520595006-bkakq683858d7cg539fhg0slauptfcdv.apps.googleusercontent.com"
);
const RESPONSE_TYPE = encodeURIComponent("id_token");
const REDIRECT_URI = encodeURIComponent(
  "https://anljcnflncdokdgppdbjfbclfbfkjaea.chromiumapp.org/"
);
const STATE = encodeURIComponent("cjkdhslk");
const SCOPE = encodeURIComponent("openid");
const PROMPT = encodeURIComponent("consent");

chrome.runtime.onMessage.addListener(receiver2);
chrome.runtime.onMessage.addListener(receiver);
chrome.runtime.onInstalled.addListener((details) => {
  switch (details.reason) {
    case "install":
      chrome.tabs.create({ url: "http://localhost:3000/welcome" });
      break;
    case "update":
      chrome.tabs.create({ url: "http://localhost:3000/update" });
      break;
    default:
      break;
  }
});

function receiver(req, sender, sendResponse) {
  switch (req.key) {
    case "status":
      verifyUserStatus().then((res) => {
        userSignedIn = res.userStatus;
        switch (userSignedIn) {
          case true:
            const token = res.userInfo.accessToken;
            if (token) {
              confirmUserStatus(res.userInfo).then((res) => sendResponse(res));
            }
            break;
          case false:
            sendResponse({ key: "loginFalse" });
            break;
          default:
            break;
        }
      });
      break;
    case "loginWebUser":
      const email = req.payload.email;
      const password = req.payload.password;
      const body = JSON.stringify({
        query: `mutation {
          verifyUser(password: "${password}", email: "${email}") {
            wordCount
            tier
            logged
            accessToken
          }
        }`,
      });
      fetch("http://localhost:4000/graphql", {
        headers: { "content-type": "application/json" },
        method: "POST",
        body,
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.data.verifyUser.logged) {
            chrome.runtime.sendMessage({ key: "failedLogin" });
          } else {
            const user_info = {
              email: email,
              accessToken: data.data.verifyUser.accessToken,
            };
            chrome.runtime.sendMessage({
              key: "successfulLogin",
              payload: data.data.verifyUser.wordCount,
              tier: data.data.verifyUser.tier,
            });
            chrome.storage.local.set({
              userStatus: true,
              userInfo: user_info,
              sumNum: data.data.verifyUser.wordCount,
            });
          }
        })
        .catch((err) => console.log(err));
      break;
    case "loginGoogleUser":
      verifyUserStatus().then((res) => {
        if (res.userStatus) returnSession = true;
        userSignedIn = res.userStatus;
        switch (userSignedIn) {
          case true:
            break;
          case false:
            chrome.identity.launchWebAuthFlow(
              {
                url: create_oauth2_url(),
                interactive: true,
              },
              async (redirect_url) => {
                let id_token = redirect_url.substring(
                  redirect_url.indexOf("id_token=") + 9
                );
                id_token = id_token.substring(0, id_token.indexOf("&"));
                let user_info = parseJwt(id_token);
                if (
                  (user_info.iss === "https://accounts.google.com" ||
                    user_info.iss === "accounts.google") &&
                  user_info.aud === CLIENT_ID
                ) {
                  const body = JSON.stringify({
                    query: `mutation {
                      verifyGoogleUser(sub: "${user_info.sub}") {
                        wordCount
                        logged
                        tier
                        accessToken
                      }
                    }`,
                  });
                  fetch("http://localhost:4000/graphql", {
                    headers: { "content-type": "application/json" },
                    method: "POST",
                    body,
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      if (!data.data.verifyGoogleUser.logged) {
                        chrome.runtime.sendMessage({ key: "failedLogin" });
                      } else {
                        chrome.runtime.sendMessage({
                          key: "successfulLogin",
                          payload: data.data.verifyGoogleUser.wordCount,
                          tier: data.data.verifyGoogleUser.tier,
                        });
                        user_info = {
                          ...user_info,
                          accessToken: data.data.verifyGoogleUser.accessToken,
                        };
                        chrome.storage.local.set({
                          userStatus: true,
                          userInfo: user_info,
                        });
                      }
                    })
                    .catch((err) => console.log(err));
                }
              }
            );
            break;
          default:
            break;
        }
      });
      break;
    case "logout":
      logout();
      sendResponse("logged out");
      break;
    case "sendSelectedText":
      retrieveSelectedText().then((response) => {
        console.log(response);
        sendResponse(response.highlightedText);
      });
      break;
    case "retrieveText":
      const url = req.payload;
      chrome.storage.local.set({ url });
      const bodyTwo = JSON.stringify({
        query: `mutation {
        webParse(url: "${url}") {
          text
          interpreter
          wordCount
          title
        }
      }`,
      });
      fetch("http://localhost:4000/graphql", {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: bodyTwo,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.data) {
            // if there is a title, save the title.
            if (data.data.webParse.title) {
              chrome.storage.local.set({
                articleTitle: data.data.webParse.title,
              });
            }
            if (data.data.webParse.text.split(" ").length < 200) {
              chrome.runtime.sendMessage({ key: "parseWeb" }, (response) => {
                // check to see if manually parse has more words. If not, stick with default.
                if (response) {
                  if (
                    response.split(" ").length >
                    data.data.webParse.text.split(" ").length
                  ) {
                    chrome.storage.local.set({
                      parsedText: response,
                    });
                    sendResponse(response);
                  } else {
                    chrome.storage.local.set({
                      parsedText: data.data.webParse.text,
                    });
                    sendResponse(data.data.webParse.text);
                  }
                } else {
                  chrome.storage.local.set({
                    parsedText: data.data.webParse.text,
                  });
                  sendResponse(data.data.webParse.text);
                }
              });
            } else {
              chrome.storage.local.set({
                parsedText: data.data.webParse.text,
              });
              sendResponse(data.data.webParse.text);
            }
          } else {
            chrome.storage.local.set({
              parsedText: "",
            });
            sendResponse("");
          }
        });
      break;
    case "retrieveArticleText":
      retrieveArticleText().then((response) => {
        sendResponse(response.parsedText);
      });
      break;
    case "storeFileText":
      const filename = req.payload.filename;
      const text = req.payload.text;
      storePDFText(text, filename);
      break;
    case "summarize":
      const action = req.payload;
      summarizeFunc(action).then((result) => {
        console.log(result);
        sendResponse(result);
      });
      break;
    case "manualSaveText":
      chrome.storage.local.set({
        manual: req.payload,
      });
      break;
    case "resetHighlight":
      chrome.storage.local.set({
        highlightedText: "You haven't highlighted any text.",
      });
      sendResponse(true);
      break;
    case "saveSummary":
      retrieveSummaryAndUrl().then((data) => {
        verifyUserStatus().then((data2) => {
          if (!data2.userInfo.email || !data2.userInfo.sub)
            sendResponse("Something has gone wrong, try again.");
          const email = data2.userInfo.email;
          const sub = data2.userInfo.sub;
          const summary = data.summary;
          const url = data.summaryUrl;
          if (data.error) {
            sendResponse("Wasn't able to retrieve the summary.");
          } else {
            const query = `mutation SaveSummary($options: SaveSummaryInputObj!) {
              saveSummary(options: $options) {
                id
              }
            }`;
            const summaryBody = JSON.stringify({
              query,
              variables: {
                options: {
                  email,
                  sub,
                  summary,
                  url,
                },
              },
            });
            fetch("http://localhost:4000/graphql", {
              headers: { "content-type": "application/json" },
              method: "POST",
              body: summaryBody,
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                sendResponse("Saved");
              });
          }
        });
      });
      break;
    default:
      break;
  }
  return true;
}

// built for when a receiver might have to process more than one request at a time.
function receiver2(req, sender, sendResponse) {
  switch (req.key) {
    case "retrieveManualText":
      retrieveManualText().then((response) => {
        sendResponse(response.manual);
      });
      break;
    default:
      break;
  }
  return true;
}

// functions section
// parse jwt into a usable form.
function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

// stores pdf text from extracted pdfs.
const storePDFText = (text, filename) => {
  chrome.storage.local.set({ file: text, url: filename });
};

// used upon every load up process to verify user status.
const confirmUserStatus = async (userInfo) => {
  let token = userInfo.accessToken;
  const { exp } = parseJwt(token);
  if (Date.now() >= exp * 1000) {
    token = await refreshAccessToken(userInfo);
  }
  const body = JSON.stringify({
    query: `query {
        me {
          wordCount
          paymentTier
          settings {
            extensionSettings{
              showSettingsLink
              referFriendLink
            }
          }
        }
      }`,
  });
  const response = await fetch("http://localhost:4000/graphql", {
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    method: "POST",
    body,
  });
  const data = await response.json();
  if (!data.data.me) return { key: "loginFalse" };
  const payload = data.data.me.wordCount;
  const tier = data.data.me.paymentTier;
  const options = {};
  options.showSettings =
    data.data.me.settings.extensionSettings.showSettingsLink;
  options.referFriendLink =
    data.data.me.settings.extensionSettings.referFriendLink;
  return { key: "loginTrue", payload, tier, options };
};

// responsible for launching google login.
const create_oauth2_url = () => {
  let nonce = encodeURIComponent(
    Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
  );
  let url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&state=${STATE}&scope=${SCOPE}&prompt=${PROMPT}&nonce=${nonce}`;
  return url;
};

// retrieves user parameters upon loading, failure results in login screen.
const verifyUserStatus = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["userStatus", "userInfo"], (response) => {
      if (chrome.runtime.lastError) {
        resolve({ userStatus: false, userInfo: {} });
      }
      resolve(
        response.userStatus === undefined
          ? { userStatus: false, userInfo: {} }
          : { userStatus: response.userStatus, userInfo: response.userInfo }
      );
    });
  });
};
const retrieveArticleText = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["parsedText"], (response) => {
      if (chrome.runtime.lastError) {
        resolve({ parsedText: "" });
      }
      resolve(
        response.parsedText === undefined
          ? { parsedText: "" }
          : { parsedText: response.parsedText }
      );
    });
  });
};

// returns the saved summaries.
const retrieveSummaryAndUrl = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["summary, summaryUrl"], (response) => {
      if (chrome.runtime.lastError) {
        resolve({ error: "Wasn't able to retrieve." });
      }
      resolve(
        response.summary === undefined
          ? { error: "Wasn't able to retrieve." }
          : { summary: response.summary, summaryUrl: response.summaryUrl }
      );
    });
  });
};
// returns article title
const retrieveArticleTitle = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["articleTitle"], (response) => {
      if (chrome.runtime.lastError) {
        resolve({ articleTitle: "" });
      }
      resolve(
        response.articleTitle === undefined
          ? { articleTitle: "" }
          : { articleTitle: response.articleTitle }
      );
    });
  });
};

// returns the stored selected text.
const retrieveSelectedText = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["highlightedText"], (response) => {
      if (chrome.runtime.lastError) {
        resolve({ highlightedText: "" });
      }
      resolve(
        response.highlightedText === undefined
          ? { highlightedText: "" }
          : { highlightedText: response.highlightedText }
      );
    });
  });
};

// returns the stored manual text.
const retrieveManualText = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["manual"], (response) => {
      if (chrome.runtime.lastError) {
        resolve({ manual: "" });
      }
      resolve(
        response.manual === undefined
          ? { manual: "" }
          : { manual: response.manual }
      );
    });
  });
};

// logout
const logout = () => {
  const query = `mutation Logout {
    logout
  }`;
  const summaryBody = JSON.stringify({
    query,
  });
  fetch("http://localhost:4000/graphql", {
    headers: { "content-type": "application/json" },
    method: "POST",
    body: summaryBody,
  }).then((res) => {
    res.json().then((data) => {
      if (data.data && data.data.logout) {
        chrome.storage.local.clear();
      }
    });
  });
  return "done";
};

// request a new access token
const refreshAccessToken = async (userInfo) => {
  // token has expired. Request new token.
  let token;
  const response = await fetch("http://localhost:4000/refresh_token", {
    method: "POST",
    credentials: "include",
  });
  const { ok, accessToken } = await response.json();

  // if token was a success, replace the old accesstoken with the new.
  if (ok) {
    token = accessToken;
    chrome.storage.local.set({ userInfo: { ...userInfo, accessToken } });
  }

  // if token wasn't a success, log out the user.

  return token;
};

const summarizeFunc = async (action, retries = 0) => {
  // retrieve fails depending on the action required.
  const initObj = await retrieveSummaryParameters(action);
  const titleObj = await retrieveArticleTitle();
  const text = initObj.text;
  const url = initObj.url;
  let token = initObj.user.accessToken;
  if (token) {
    // parse the token
    const { exp } = parseJwt(token);
    // if the token is known to be expired, request new token.
    if (Date.now() >= exp * 1000) {
      token = await refreshAccessToken(initObj.user);
    }
  }

  // if the text isn't blank, hit the backend with a summarization request.
  if (text !== "") {
    const query = `mutation Summarize($options: SummaryInputObj!) {
      summarize(options: $options) {
        summary
        remainingSummaries
        id
        popout
      }
    }`;
    const summaryBody = JSON.stringify({
      query,
      variables: {
        options: {
          text,
          url,
          title: titleObj.articleTitle,
        },
      },
    });
    const response = await fetch("http://localhost:4000/graphql", {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      method: "POST",
      body: summaryBody,
    });
    const data = await response.json();

    // if authentication still fails, try one more time.
    if (
      data.errors &&
      data.errors[0].message === "Not authenticated." &&
      retries == 0
    ) {
      await refreshAccessToken(initObj.user);
      summarizeFunc(action, 1);
    }
    if (data.data && data.data.summarize) {
      const summary = data.data.summarize.summary;
      console.log(data);
      chrome.storage.local.set({ summaryUrl: url, summary });
      return data;
    }
  } else {
    return "not enough text";
  }
};

// when summarizing, use this function to return the appropriate data for the action type.
const retrieveSummaryParameters = (action) => {
  return new Promise((resolve) => {
    verifyUserStatus().then((data) => {
      let userParams = {};
      if (data.userInfo.email) {
        userParams = {
          email: data.userInfo.email,
          sub: undefined,
          accessToken: data.userInfo.accessToken,
        };
      } else if (data.userInfo.sub) {
        userParams = {
          email: undefined,
          sub: data.userInfo.sub,
          accessToken: data.userInfo.accessToken,
        };
      }
      switch (action) {
        case "entire":
          chrome.storage.local.get(["parsedText", "url"], (response) => {
            if (chrome.runtime.lastError) {
              resolve({ text: "", url: "", user: userParams });
            }
            resolve(
              response.parsedText === undefined
                ? { text: "", url: "", user: userParams }
                : {
                    text: response.parsedText,
                    url: response.url,
                    user: userParams,
                  }
            );
          });
          break;
        case "highlighted":
          chrome.storage.local.get(["highlightedText", "url"], (response) => {
            if (chrome.runtime.lastError) {
              resolve({ text: "", url: "", user: userParams });
            }
            resolve(
              response.highlightedText === undefined
                ? { text: "", url: "", user: userParams }
                : {
                    text: response.highlightedText,
                    url: response.url,
                    user: userParams,
                  }
            );
          });
          break;
        case "file":
          chrome.storage.local.get(["file", "url"], (response) => {
            if (chrome.runtime.lastError) {
              resolve({ text: "", url: "", user: userParams });
            }
            resolve(
              response.file === undefined
                ? { text: "", url: "", user: userParams }
                : { text: response.file, url: response.url, user: userParams }
            );
          });
          break;
        case "manual":
          chrome.storage.local.get(["manual", "url"], (response) => {
            if (chrome.runtime.lastError) {
              resolve({ text: "", url: "", user: userParams });
            }
            resolve(
              response.manual === undefined
                ? { text: "", url: "", user: userParams }
                : { text: response.manual, url: response.url, user: userParams }
            );
          });
          break;
      }
    });
  });
};
