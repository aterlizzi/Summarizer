// mass element selection.
const button = document.querySelector(".btn");
const spinner = document.querySelector(".hidden");
const sumWrapper = document.querySelector(".sumWrapper");
const mainSpinnerContainer = document.querySelector(".mainSpinnerContainer");
const loginWrapper = document.querySelector(".loginWrapper");
const googleBtn = document.querySelector(".google");
const webBtn = document.querySelector(".web");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const errorContainer = document.querySelector(".errorContainer");
const circle = document.querySelector(".circle");
const settingsCircle = document.querySelector(".settingsCircle");
const referFriendCircle = document.querySelector(".referFriendLink");
const sumNum = document.querySelector(".sumNum");
const articleContainer = document.querySelector(".entireArticle");
const highlightedContainer = document.querySelector(".highlighted");
const manualContainer = document.querySelector(".manual");
const pdfContainer = document.querySelector(".pdf");
const hTextParaText = document.querySelector(".hTextParaText");
const parameters = document.querySelector(".parameters");
const hTextPara = document.querySelector(".hTextPara");
const mTextPara = document.querySelector(".mTextPara");
const manualTextArea = document.querySelector(".manualTextarea");
const textSpinner = document.querySelector(".textSpinner");
const saveSpinner = document.querySelector(".saveSpinner");
const wordCountContainer = document.querySelector(".wordCountContainer");
const count = document.querySelector(".count");
const filePara = document.querySelector(".filePara");
const fileUpload = document.querySelector(".fileUpload");
const rightContainer = document.querySelector(".rightContainer");
const mTrashBtn = document.querySelector(".mTrash");
const hTrashBtn = document.querySelector(".hTrash");
const summaryContainer = document.querySelector(".container");
const bookmark = document.querySelector(".save");
const saveRejectContainer = document.querySelector(".saveRejectContainer");
const popoutBtn = document.querySelector(".reject");

// icons
const pdfIcon = document.querySelector(".pdficon");
const manualIcon = document.querySelector(".manualicon");

// specific texts
const pdfText = document.querySelector(".pdftext");
const manualText = document.querySelector(".manualtext");

// variables
let action = "entire";
let logged = false;
let manualAction = true;
let pdfAction = true;
let typingTimer;
let sumId;

// get status check when loading the popup, if login fails show login if login succeeds, proceed to application.
// also retrieves the remaining word count from backend
window.onload = () => {
  chrome.runtime.sendMessage({ key: "status" }, (response) => {
    if (response.key === "loginTrue") {
      checkTier(response.tier);
      handleOnLoadClassChanges();
      checkOptions(response.options);
      sumNum.textContent = checkText(response.payload);
      textSpinner.classList.remove("none");
      logged = true;
    } else if (response.key === "loginFalse") {
      loginWrapper.classList.remove("none");
      circle.classList.add("none");
      wordCountContainer.classList.add("none");
      logged = false;
    }
    mainSpinnerContainer.classList.add("none");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0].url;
      chrome.runtime.sendMessage(
        { key: "retrieveText", payload: url },
        (response) => {
          console.log(response);
          textSpinner.classList.add("none");
          if (logged) {
            wordCountContainer.classList.remove("none");
          }
          if (response) {
            count.textContent = response.split(" ").length.toString();
          }
        }
      );
    });
  });
};

// clear and save manual text
mTrashBtn.addEventListener("click", () => {
  manualTextArea.value = "";
  chrome.runtime.sendMessage({ key: "manualSaveText", payload: "" });
});
hTrashBtn.addEventListener("click", () => {
  chrome.runtime.sendMessage({ key: "resetHighlight" }, (response) => {
    if (response) {
      hTextParaText.style.color = "#cf6679";
      hTextParaText.textContent = "You haven't highlighted any text.";
    }
  });
});
bookmark.addEventListener("click", () => {
  chrome.runtime.sendMessage({ key: "saveSummary" }, (response) => {
    console.log(response);
  });
});

// main listener, listens for login success and failure upon completion of login page.
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  let summary;
  switch (req.key) {
    case "failedLogin":
      errorContainer.classList.remove("none");
      break;
    case "successfulLogin":
      checkTier(req.tier);
      handleOnLoadClassChanges();
      loginWrapper.classList.add("none");
      sumNum.textContent = checkText(req.payload);
      break;
    case "parseWeb":
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { key: "parseWeb" }, (response) => {
          if (response) {
            count.textContent = response.split(" ").length.toString();
          } else {
            count.textContent = "0";
          }
          sendResponse(response);
        });
      });
      break;
    case "k8k4IQwFaX":
      button.classList.toggle("hidden");
      spinner.classList.toggle("hidden");
      summary = req.text;
      break;
    case "ogLlRDalkA":
      button.classList.toggle("hidden");
      spinner.classList.toggle("hidden");
      summary = req.text;
      break;
    default:
      break;
  }
  return true;
});

// utility functions

const checkTier = (tier) => {
  switch (tier) {
    case "Free":
      manualAction = false;
      pdfAction = false;
      pdfIcon.style.color = "rgba(255, 255, 255, 0.2)";
      manualIcon.style.color = "rgba(255, 255, 255, 0.2)";
      pdfText.style.color = "rgba(255, 255, 255, 0.6)";
      manualText.style.color = "rgba(255, 255, 255, 0.6)";
      break;
    case "Student":
      break;
    case "Researcher":
      break;
    default:
      break;
  }
};

// shows and disabled options depending on user settings
const checkOptions = (options) => {
  if (options.showSettings === false) {
    settingsCircle.classList.add("none");
  }
  if (options.referFriendLink === false) {
    referFriendCircle.classList.add("none");
  }
};

// converts the wordcount into appropriate sizes.
const checkText = (text) => {
  let number;
  let final;
  let roundedNum;
  if (text >= 1000000) {
    number = text / 1000000;
    roundedNum = Math.round(number * 10) / 10;
    final = roundedNum + "M";
  } else if (text >= 100000) {
    number = text / 1000;
    roundedNum = Math.round(number * 10) / 10;
    final = roundedNum + "K";
  } else {
    final = text.toString();
  }
  return final;
};

const handleSaveText = () => {
  saveSpinner.classList.remove("none");
  chrome.runtime.sendMessage(
    { key: "manualSaveText", payload: manualTextArea.value },
    (response) => {
      if (response) saveSpinner.classList.add("none");
    }
  );
};

const handleOnLoadClassChanges = () => {
  sumWrapper.classList.remove("none");
  settingsCircle.classList.remove("none");
  referFriendCircle.classList.remove("none");
  circle.classList.remove("none");
};

// if cookie is found for website, navigate to settings, else navigate to login
const checkCookies = () => {
  chrome.cookies.get(
    { url: "https://untanglify.com/", name: "jid" },
    (cookie) => {
      if (cookie) {
        chrome.tabs.create({ url: "https://untanglify.com/users/settings" });
      } else {
        chrome.tabs.create({
          url: `https://untanglify.com/welcome?return_url=${encodeURIComponent(
            "/users/settings"
          )}`,
        });
      }
    }
  );
};
// count number of words in text.
const countWords = (text) => {
  // remove any excess characters that are not A-Z or a-z
  const removeChar = text.replace(/[^A-Za-z]\s+/g, " ");

  // remove white space in front of and behind the string. Then split into an array.
  const newWord = removeChar.trim().split(" ");

  // return the array length to get the word count.
  return newWord.length;
};
// save text
manualTextArea.addEventListener("keyup", () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(handleSaveText, 3000);
});

manualTextArea.addEventListener("keydn", () => {
  clearTimeout(typingTimer);
});

// button responses and functionalities
// this is the majority of the summarizer functionality section.

popoutBtn.addEventListener("click", () => {
  chrome.tabs.create({
    url: `https://untanglify.com/summaries/${sumId}`,
  });
});

button.addEventListener("click", () => {
  saveRejectContainer.classList.add("none");
  button.classList.toggle("hidden");
  spinner.classList.toggle("hidden");
  summaryContainer.classList.remove("none");
  chrome.runtime.sendMessage(
    { key: "summarize", payload: action },
    (response) => {
      console.log(response);
      if (response) {
        if (response.data) {
          if (response.data.summarize) {
            spinner.classList.toggle("hidden");
            button.classList.toggle("hidden");
            if (
              response.data.summarize.summary !==
              "I'm sorry, we were unable to summarize this text."
            ) {
              saveRejectContainer.classList.remove("none");
            }
            response.data.summarize.summary.split("NEWSECTION").map((text) => {
              const newSummary = document.createElement("p");
              newSummary.className = "summary";
              newSummary.textContent = text;
              summaryContainer.insertBefore(newSummary, saveRejectContainer);
            });
            sumNum.textContent = checkText(
              response.data.summarize.remainingSummaries
            );
            sumId = response.data.summarize.id;

            // if user wants the summary to popout, this will automatically handle that action.
            if (response.data.summarize.popout) {
              chrome.tabs.create({
                url: `https://untanglify.com/summaries/${sumId}`,
              });
            }
          }
        }
      } else {
        spinner.classList.toggle("hidden");
        button.classList.toggle("hidden");
        const newSummary = document.createElement("p");
        newSummary.className = "summary";
        newSummary.textContent =
          "You don't have any enough words left to summarize this text. But don't worry, we've got a solution! Either refer a friend, upgrade your subscription, or wait until your next period begins.";
        newSummary.style.color = "#cf6679";
        summaryContainer.insertBefore(newSummary, saveRejectContainer);
      }
      return true;
    }
  );
});

fileUpload.addEventListener("change", (e) => {
  if (e.target.files[0].type !== "application/pdf") {
    alert("invalid file type");
  } else {
    textSpinner.classList.remove("none");
    action = "file";
    rightContainer.classList.add("animation");
    const file = fileUpload.files[0];
    const fileName = file.name;
    const formData = new FormData();
    formData.append("file", file);
    fetch("https://untanglify.com/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        textSpinner.classList.add("none");
        if (data.result) {
          const wordCount = countWords(data.result).toString();
          count.textContent = wordCount;
          chrome.runtime.sendMessage({
            key: "storeFileText",
            payload: { filename: fileName, text: data.result },
          });
        }
      });
  }
});
// activates login with google
googleBtn.addEventListener("click", () => {
  errorContainer.classList.add("none");
  chrome.runtime.sendMessage({ key: "loginGoogleUser" });
});

// activates login with web
webBtn.addEventListener("click", () => {
  errorContainer.classList.add("none");
  const email = emailInput.value;
  const password = passwordInput.value;
  chrome.runtime.sendMessage({
    key: "loginWebUser",
    payload: { email, password },
  });
});

// selects entire article summmary options
articleContainer.addEventListener("click", () => {
  highlightedContainer.classList.remove("active");
  manualContainer.classList.remove("active");
  pdfContainer.classList.remove("active");
  articleContainer.classList.toggle("active");
  parameters.classList.add("none");
  hTextPara.classList.add("none");
  mTextPara.classList.add("none");
  filePara.classList.add("none");
  wordCountContainer.classList.add("none");
  action = "entire";
  chrome.runtime.sendMessage({ key: "retrieveArticleText" }, (response) => {
    if (response) {
      wordCountContainer.classList.remove("none");
      if (response !== "") {
        count.textContent = response.split(" ").length.toString();
      } else {
        count.textContent = "0";
      }
    }
  });
});

// allows for pdf submission
pdfContainer.addEventListener("click", () => {
  if (!pdfAction) {
    chrome.tabs.create({ url: "https://untanglify.com/begin" });
    return;
  }
  highlightedContainer.classList.remove("active");
  manualContainer.classList.remove("active");
  articleContainer.classList.remove("active");
  pdfContainer.classList.toggle("active");
  parameters.classList.remove("none");
  hTextPara.classList.add("none");
  mTextPara.classList.add("none");
  filePara.classList.remove("none");
  action = "pdf";
});

// selects only highlighted text summary option and opens up highlighted text parameter.
highlightedContainer.addEventListener("click", () => {
  articleContainer.classList.remove("active");
  manualContainer.classList.remove("active");
  pdfContainer.classList.remove("active");
  mTextPara.classList.add("none");
  highlightedContainer.classList.toggle("active");
  wordCountContainer.classList.add("none");
  filePara.classList.add("none");
  action = "highlighted";
  chrome.runtime.sendMessage({ key: "sendSelectedText" }, (response) => {
    if (response === "") {
      parameters.classList.remove("none");
      hTextPara.classList.remove("none");
      hTextParaText.classList.add("error");
      hTextParaText.style.textAlign = "left";
      hTextParaText.textContent =
        "Please select your desired text by clicking and dragging over the text on the page, just like if you're trying to copy and paste. After your desired selection is made, your selection is automatically saved locally and displayed here.";
    } else {
      parameters.classList.remove("none");
      hTextPara.classList.remove("none");
      hTextParaText.classList.remove("error");
      hTextParaText.textContent = response;
      wordCountContainer.classList.remove("none");
      count.textContent = response.split(" ").length.toString();
    }
  });
});

// selects manually inputted text
manualContainer.addEventListener("click", () => {
  if (!manualAction) {
    chrome.tabs.create({ url: "https://untanglify.com/begin" });
    return;
  }
  articleContainer.classList.remove("active");
  highlightedContainer.classList.remove("active");
  pdfContainer.classList.remove("active");
  parameters.classList.remove("none");
  mTextPara.classList.remove("none");
  manualContainer.classList.toggle("active");
  hTextPara.classList.add("none");
  filePara.classList.add("none");
  action = "manual";
  chrome.runtime.sendMessage({ key: "retrieveManualText" }, (response) => {
    if (response !== "") {
      manualTextArea.value = response;
    }
  });
  manualTextArea.addEventListener("keyup", (e) => {
    if (e.currentTarget.value === "") {
      count.textContent = "0";
    } else {
      const text = e.currentTarget.value;
      count.textContent = text.split(" ").length.toString();
    }
  });
});

// opens settings when clicked.
settingsCircle.addEventListener("click", () => {
  checkCookies();
});

// opens refer a friend link when clicked
referFriendCircle.addEventListener("click", () => {
  chrome.tabs.create({ url: "https://untanglify.com/referral" });
});
