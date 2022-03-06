("use strict");
const nodemailer = require("nodemailer");
import { GetAccessToken } from "./../googleapi";

export async function sendInterestEmail(email: string) {
  console.log("snet");
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
        to: "aidan@untanglify.com",
        subject: `[ACTION REQUIRED] User Interest - Untanglify`, // Subject line
        text: `User with email ${email} filled out interest.`, // plain text body
        html: `<p>User with email ${email} filled out interest.</p>`, // html body
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
        to: "aidan@untanglify.com",
        subject: `[ACTION REQUIRED] User Interest - Untanglify`, // Subject line
        text: `User with email ${email} filled out interest.`, // plain text body
        html: `<p>User with email ${email} filled out interest.</p>`, // html body
      };

      let info = await transporter.sendMail(mailOptions);

      console.log("Message sent: %s", info.messageId);

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}
