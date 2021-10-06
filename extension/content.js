let selectedText;
let text;

// select text

document.onmouseup = doSomethingWithSelectedText;
document.onkeyup = doSomethingWithSelectedText;

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  switch (req.key) {
    case "parseWeb":
      const text = DOMParser();
      sendResponse(text);
      break;
    default:
      break;
  }
  return true;
});

const DOMParser = () => {
  const body = document.body;
  const articleArr = [];
  let article;
  let wordCount;
  console.log(body);
  if (body.querySelector("#root")) {
    if (body.querySelector("#root").tagName.toLowerCase() === "div") {
      return "";
    }
  } else {
    const paragraphArr = document.querySelectorAll("p");
    paragraphArr.forEach((paragraph) => {
      articleArr.push(paragraph.textContent);
    });
    // remove headlines based on paragraph length.
    const filteredArr = articleArr.filter((paragraph) => {
      const regex = /Copyright \(c\).*|Copyright © .*/gm;
      if (paragraph.split(" ").length < 7) return false;
      if (paragraph.match(regex)) return false;
      return true;
    });
    // calculate total wordcount
    wordCount = filteredArr.reduce((accumulator, value) => {
      return value.split(" ").length + accumulator;
    }, 0);
    article = filteredArr.join("\n");
    if (wordCount > 1150) {
      const reFilter = article.split(" ").filter((_, idx) => {
        if (idx > 1149) return false;
        return true;
      });
      article = reFilter.join(" ");
    }
    console.log(wordCount);
    console.log(article);
    return article;
  }
};

function getSelectedText() {
  text = "";
  if (typeof window.getSelection != "undefined") {
    text = window.getSelection().toString();
  } else if (
    typeof document.selection != "undefined" &&
    document.selection.type == "Text"
  ) {
    text = document.selection.createRange().text;
  }
  return text;
}

function doSomethingWithSelectedText() {
  selectedText = getSelectedText();
  if (selectedText) {
    verifyUserStatus().then((response) => {
      if (response.userStatus) {
        chrome.storage.local.set({ highlightedText: selectedText });
        console.log("set");
      }
    });
  }
}

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
