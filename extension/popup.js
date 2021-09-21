const emptyTag = document.querySelector(".summary");
const button = document.querySelector(".btn");
const spinner = document.querySelector(".hidden");
const sumWrapper = document.querySelector(".sumWrapper");
const mainSpinnerContainer = document.querySelector(".mainSpinnerContainer");
const loginWrapper = document.querySelector(".loginWrapper");

// get status check when loading the popup
window.onload = () => {
  console.log("ready");
  chrome.runtime.sendMessage({ key: "status" }, (response) => {
    if (response.key === "loginTrue") {
      sumWrapper.classList.remove("none");
    } else if (response.key === "loginFalse") {
      loginWrapper.classList.remove("none");
    }
    mainSpinnerContainer.classList.add("none");
  });
};

button.addEventListener("click", () => {
  button.classList.toggle("hidden");
  spinner.classList.toggle("hidden");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { text: "Hello world." });
  });
});

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  console.log(msg);
  let summary;
  switch (msg.key) {
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
