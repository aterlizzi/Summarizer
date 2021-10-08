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

chrome.runtime.onMessage.addListener(receiver);

function receiver(req, sender, sendResponse) {
  switch (req.key) {
    case "status":
      verifyUserStatus().then((res) => {
        userSignedIn = res.userStatus;
        switch (userSignedIn) {
          case true:
            if (res.userInfo.email) {
              const body = JSON.stringify({
                query: `query {
                    me(email: "${res.userInfo.email}") {
                      remainingSummaries
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
                  const payload = data.data.me.remainingSummaries;
                  sendResponse({ key: "loginTrue", payload });
                })
                .catch((err) => console.log(err));
            } else if (res.userInfo.sub) {
              const body = JSON.stringify({
                query: `query {
                    me(sub: "${res.userInfo.sub}") {
                      remainingSummaries
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
                  const payload = data.data.me.remainingSummaries;
                  sendResponse({ key: "loginTrue", payload });
                })
                .catch((err) => console.log(err));
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
            remainingSummaries
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
          if (!data.data.verifyUser) {
            chrome.runtime.sendMessage({ key: "failedLogin" });
          } else {
            const user_info = {
              email: email,
            };
            chrome.runtime.sendMessage({
              key: "successfulLogin",
              payload: data.data.verifyUser.remainingSummaries,
            });
            chrome.storage.local.set({
              userStatus: true,
              userInfo: user_info,
              sumNum: data.data.verifyUser.remainingSummaries,
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
                console.log(redirect_url);
                console.log();
                let id_token = redirect_url.substring(
                  redirect_url.indexOf("id_token=") + 9
                );
                id_token = id_token.substring(0, id_token.indexOf("&"));
                const user_info = parseJwt(id_token);
                console.log(user_info);
                if (
                  (user_info.iss === "https://accounts.google.com" ||
                    user_info.iss === "accounts.google") &&
                  user_info.aud === CLIENT_ID
                ) {
                  const body = JSON.stringify({
                    query: `mutation {
                      verifyGoogleUser(sub: "${user_info.sub}") {
                        remainingSummaries
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
                      console.log(data);
                      if (!data.data.verifyGoogleUser) {
                        chrome.runtime.sendMessage({ key: "failedLogin" });
                      } else {
                        const payload =
                          data.data.verifyGoogleUser.remainingSummaries;
                        chrome.runtime.sendMessage({
                          key: "successfulLogin",
                          payload,
                        });
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
      // log user out
      break;
    case "J4KPsEOjYy":
      // make api request for summary
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
    case "fileUpload":
      console.log(req.payload);
      fetch("http://localhost:4000/upload", {
        method: "POST",
        body: req.payload,
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
      break;
    case "summarize":
      const action = req.payload;
      retrieveSummaryParameters(action).then((initObj) => {
        const email = initObj.user.email;
        const sub = initObj.user.sub;
        const text = initObj.text;
        const url = initObj.url;
        if (text !== "") {
          const query = `mutation Summarize($options: SummaryInputObj!) {
            summarize(options: $options)
          }`;
          const summaryBody = JSON.stringify({
            query,
            variables: {
              options: {
                email,
                sub,
                text,
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
              sendResponse(data);
            });
        } else {
          sendResponse("not enough text");
        }
      });
      break;
    case "manualSaveText":
      chrome.storage.local.set({
        manual: req.payload,
      });
      sendResponse(true);
      break;
    case "retrieveManualText":
      retrieveManualText().then((response) => {
        sendResponse(response.manual);
      });
    default:
      break;
  }
  return true;
}
// const data = {
//   prompt: `Write a short summary of the text.\nText: ${req.text}\nSummary:`,
//   max_tokens: 256,
//   temperature: 0.7,
//   top_p: 1,
//   stream: false,
// };
// const options = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization:
//       "Bearer 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",
//   },
//   body: JSON.stringify(data),
// };
// fetch(
//   "https://api.openai.com/v1/engines/davinci-instruct-beta/completions",
//   options
// )
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//     returnMsg = data.choices[0].text;
//     chrome.runtime.sendMessage({ key: "k8k4IQwFaX", text: returnMsg });
//   });

// Give a brief statement of the main points of the following text.

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
const create_oauth2_url = () => {
  let nonce = encodeURIComponent(
    Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
  );
  let url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&state=${STATE}&scope=${SCOPE}&prompt=${PROMPT}&nonce=${nonce}`;
  return url;
};
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

const retrieveSummaryParameters = (action) => {
  return new Promise((resolve) => {
    verifyUserStatus().then((data) => {
      let userParams = {};
      if (data.userInfo.email) {
        userParams = { email: data.userInfo.email, sub: undefined };
      } else if (data.userInfo.sub) {
        userParams = { email: undefined, sub: data.userInfo.sub };
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
