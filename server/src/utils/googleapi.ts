const { google } = require("googleapis");

const CLIENT_ID = process.env.GOOGLE_GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_GMAIL_CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.GOOGLE_GMAIL_REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const GetAccessToken = async () => {
  return await oAuth2Client.getAccessToken();
};
