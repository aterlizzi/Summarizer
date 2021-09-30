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
const outlineContainer = document.querySelector(".outline");
const pdfContainer = document.querySelector(".pdf");
const hTextParaText = document.querySelector(".hTextParaText");
const parameters = document.querySelector(".parameters");
const hTextPara = document.querySelector(".hTextPara");
const mTextPara = document.querySelector(".mTextPara");

let action = "entire";

// get status check when loading the popup
// also retrieves the remaining summaries from backend
window.onload = () => {
  chrome.runtime.sendMessage({ key: "status" }, (response) => {
    if (response.key === "loginTrue") {
      sumWrapper.classList.remove("none");
      circle.classList.remove("none");
      sumNum.textContent = response.payload;
    } else if (response.key === "loginFalse") {
      loginWrapper.classList.remove("none");
      circle.classList.add("none");
    }
    mainSpinnerContainer.classList.add("none");
  });
};
// runs content script
// this will be reworked
button.addEventListener("click", () => {
  button.classList.toggle("hidden");
  spinner.classList.toggle("hidden");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { text: "Hello world." });
  });
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
  outlineContainer.classList.remove("active");
  pdfContainer.classList.remove("active");
  articleContainer.classList.toggle("active");
  parameters.classList.add("none");
  hTextPara.classList.add("none");
  mTextPara.classList.add("none");
  action = "entire";
});

outlineContainer.addEventListener("click", () => {
  highlightedContainer.classList.remove("active");
  manualContainer.classList.remove("active");
  articleContainer.classList.remove("active");
  pdfContainer.classList.remove("active");
  outlineContainer.classList.toggle("active");
  parameters.classList.add("none");
  hTextPara.classList.add("none");
  mTextPara.classList.add("none");
  action = "outline";
});

pdfContainer.addEventListener("click", () => {
  highlightedContainer.classList.remove("active");
  manualContainer.classList.remove("active");
  articleContainer.classList.remove("active");
  outlineContainer.classList.remove("active");
  pdfContainer.classList.toggle("active");
  parameters.classList.remove("none");
  hTextPara.classList.add("none");
  mTextPara.classList.add("none");
  action = "pdf";
});

// selects only highlighted text summary option and opens up highlighted text parameter.
highlightedContainer.addEventListener("click", () => {
  articleContainer.classList.remove("active");
  manualContainer.classList.remove("active");
  outlineContainer.classList.remove("active");
  pdfContainer.classList.remove("active");
  mTextPara.classList.add("none");
  highlightedContainer.classList.toggle("active");
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
    }
  });
});

manualContainer.addEventListener("click", () => {
  articleContainer.classList.remove("active");
  highlightedContainer.classList.remove("active");
  outlineContainer.classList.remove("active");
  pdfContainer.classList.remove("active");
  manualContainer.classList.toggle("active");
  parameters.classList.remove("none");
  hTextPara.classList.add("none");
  mTextPara.classList.remove("none");
  action = "manual";
});

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  console.log(msg);
  let summary;
  switch (msg.key) {
    case "failedLogin":
      errorContainer.classList.remove("none");
      break;
    case "successfulLogin":
      loginWrapper.classList.add("none");
      sumWrapper.classList.remove("none");
      circle.classList.remove("none");
      sumNum.textContent = msg.payload;
      break;
    case "k8k4IQwFaX":
      button.classList.toggle("hidden");
      spinner.classList.toggle("hidden");
      summary = msg.text;
      emptyTag.textContent = summary;
      break;
    case "ogLlRDalkA":
      button.classList.toggle("hidden");
      spinner.classList.toggle("hidden");
      summary = msg.text;
      break;
    default:
      break;
  }
});
