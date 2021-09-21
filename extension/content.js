chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.text === "Hello world.") {
    let message = DOMParser();
    chrome.runtime.sendMessage(message);
  }
});

const DOMParser = () => {
  const body = document.body;
  const articleArr = [];
  let article;
  let wordCount;
  console.log(body);
  if (body.querySelector("#root")) {
    if (body.querySelector("#root").tagName.toLowerCase() === "div") {
      return {
        key: "ogLlRDalkA",
        text: "Can't summarize this article format.",
      };
    }
  } else {
    const paragraphArr = document.querySelectorAll("p");
    paragraphArr.forEach((paragraph) => {
      articleArr.push(paragraph.textContent);
    });
    // remove headlines based on paragraph length.
    const filteredArr = articleArr.filter((paragraph) => {
      if (paragraph.split(" ").length < 7) return false;
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
    return { key: "J4KPsEOjYy", text: article };
  }
};
