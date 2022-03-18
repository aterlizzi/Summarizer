import { GetAccessToken } from "./../googleapi";
("use strict");
const nodemailer = require("nodemailer");

export async function sendChangeEmailMail(
  username: string,
  email: string,
  token: string
) {
  const url =
    process.env.NODE_ENV === "production"
      ? `https://untanglify.com/users/change-email/${token}`
      : `http://localhost:4000/users/change-email/${token}`;
  try {
    if (process.env.NODE_ENV === "production") {
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
        text: `Hi ${username}, please confirm your account by clicking the link below: ${url}`, // plain text body
        html: `Hi ${username}, <br/>Please confirm your account by clicking the link below. ${url}<br/>`, // html body
      };

      let info = await transport.sendMail(mailOptions);

      console.log("Message sent: %s", info.messageId);

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } else {
      const testAccount = await nodemailer.createTestAccount();

      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });

      const mailOptions = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: email,
        subject: `[ACTION REQUIRED] Email Updated`, // Subject line
        text: `Hi ${username}, please confirm your account by clicking the link below: ${url}`, // plain text body
        html: `Hi ${username}, <br/>Please confirm your account by clicking the link below. ${url}<br/>`, // html body
      };

      let info = await transporter.sendMail(mailOptions);

      console.log("Message sent: %s", info.messageId);

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  } catch (err) {
    return err;
  }
}
