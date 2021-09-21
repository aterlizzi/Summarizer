let returnMsg;
let returnSession = false;
let userSignedIn = false;

const verifyUserStatus = () => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["userStatus", "userInfo"], (response) => {});
    if (chrome.runtime.lastError) resolve({ userStatus: false, userInfo: {} });
    resolve(
      response.userStatus === undefined
        ? { userStatus: false, userInfo: {} }
        : { userStatus: response.userStatus, userInfo: response.userInfo }
    );
  });
};
chrome.runtime.onMessage.addListener(receiver);
chrome.action.onClicked.addListener(() => {
  verifyUserStatus()
    .then((res) => {
      if (res.userStatus) returnSession = true;
      userSignedIn = res.userStatus;
    })
    .catch((err) => console.log(err));
  switch (userSignedIn) {
    case true:
      break;
    case false:
      chrome.action.setPopup({ popup: "./signIn.html" });
      break;
    default:
      break;
  }
});

function receiver(req, sender, sendResponse) {
  switch (req.key) {
    case "status":
      // verify logged in status
      break;
    case "login":
      // verify user and log user in
      break;
    case "logout":
      // log user out
      break;
    case "J4KPsEOjYy":
      // make api request for summary
      break;
    default:
      break;
  }
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
