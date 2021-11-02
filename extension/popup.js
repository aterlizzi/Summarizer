const emptyTag = document.querySelector(".summary");
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

let action = "entire";
let logged = false;
let typingTimer;

// get status check when loading the popup
// also retrieves the remaining summaries from backend
window.onload = () => {
  chrome.runtime.sendMessage({ key: "status" }, (response) => {
    if (response.key === "loginTrue") {
      sumWrapper.classList.remove("none");
      circle.classList.remove("none");
      sumNum.textContent = response.payload;
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
// runs content script

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

// this will be reworked
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
            emptyTag.textContent = response.data.summarize.summary;
          } else {
            spinner.classList.toggle("hidden");
            button.classList.toggle("hidden");
            emptyTag.textContent =
              "You don't have any enough words left to summarize this text.";
            emptyTag.style.color = "#cf6679";
          }
        }
      }
      return true;
    }
  );
});

fileUpload.addEventListener("change", (e) => {
  if (e.target.files[0].type !== "application/pdf") {
    alert("invalid file type");
  } else {
    action = "file";
    rightContainer.classList.add("animation");
    const file = fileUpload.files[0];
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
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

// save text
manualTextArea.addEventListener("keyup", () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(handleSaveText, 3000);
});

manualTextArea.addEventListener("keydn", () => {
  clearTimeout(typingTimer);
});

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  let summary;
  switch (req.key) {
    case "failedLogin":
      errorContainer.classList.remove("none");
      break;
    case "successfulLogin":
      loginWrapper.classList.add("none");
      sumWrapper.classList.remove("none");
      circle.classList.remove("none");
      sumNum.textContent = req.payload;
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
      emptyTag.textContent = summary;
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

const handleSaveText = () => {
  saveSpinner.classList.remove("none");
  chrome.runtime.sendMessage(
    { key: "manualSaveText", payload: manualTextArea.value },
    (response) => {
      if (response) saveSpinner.classList.add("none");
    }
  );
};
