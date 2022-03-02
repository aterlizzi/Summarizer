"use strict";

import { GetAccessToken } from "../googleapi";

const nodemailer = require("nodemailer");

export async function sendNewUserEmail(email: string, username: string) {
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
        from: '"Untanglify" <team@untanglify.com>', // sender address
        to: "aidan@untanglify.com", // list of receivers
        subject: `New User Signup - Untanglify`, // Subject line
        text: `A User with the username of: ${username}, and the Email of: ${email}, just signed up!`, // plain text body
        html: `<h1>New User Alert!</h1><br/><br/><p>A user with the username of <span style="color:#bb86fc">${username}</span> and an email of <span style="color:#bb86fc">${email}</span> just signed up!</p><br/><br/><p>Go email them!</p>`, // html body
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
        to: "aidan@untanglify.com", // list of receivers
        subject: `New User Signup - Untanglify`, // Subject line
        text: `A User with the username of: ${username}, and the Email of: ${email}, just signed up!`, // plain text body
        html: `<h1>New User Alert!</h1><br/><br/><p>A user with the username of <span style="color:#bb86fc">${username}</span> and an email of <span style="color:#bb86fc">${email}</span> just signed up!</p><br/><br/><p>Go email them!</p>`, // html body
      };

      let info = await transporter.sendMail(mailOptions);

      console.log("Message sent: %s", info.messageId);

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  } catch (err) {
    return err;
  }
}
