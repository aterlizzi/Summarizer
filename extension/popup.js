const emptyTag = document.querySelector(".summary");
const button = document.querySelector(".btn");
const spinner = document.querySelector(".hidden");
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
  if (msg.key === "k8k4IQwFaX") {
    button.classList.toggle("hidden");
    spinner.classList.toggle("hidden");
    summary = msg.text;
  } else if (msg.key === "ogLlRDalkA") {
    button.classList.toggle("hidden");
    spinner.classList.toggle("hidden");
    summary = msg.text;
  }
  emptyTag.textContent = summary;
});
