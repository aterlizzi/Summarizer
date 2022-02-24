import { GetAccessToken } from "./../googleapi";
("use strict");
const nodemailer = require("nodemailer");

export async function sendChangeEmailMail(email: string, username: string) {
  try {
    const accessToken = GetAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "untanglify@gmail.com",
        clientId: process.env.GOOGLE_GMAIL_CLIENT_ID,
        clientSecret: process.env.GOOGLE_GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_GMAIL_REFRESH_TOKEN,
        accessToken,
      },
    });

    const mailOptions = {
      from: '"Untanglify" <team@untanglify.com>',
      to: email,
      subject: `[ACTION REQUIRED] Email Updated`, // Subject line
      text: `Hi ${username}, please confirm your account by clicking the link below.`, // plain text body
      html: `Hi ${username}, <br/>Please confirm your account by clicking the link below.<br/>`, // html body
    };

    let info = await transport.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    return err;
  }
}
