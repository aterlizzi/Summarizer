"use strict";

import { GetAccessToken } from "../googleapi";

const nodemailer = require("nodemailer");

export async function sendForgotPasswordEmail(email: string, token: string) {
  const url =
    process.env.NODE_ENV === "production"
      ? `https://untanglify.com/users/forgot-password/${token}`
      : `http://localhost:4000/users/forgot-password/${token}`;
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
      from: "team@untanglify.com", // sender address
      to: email, // list of receivers
      subject: `[ACTION REQUIRED] Untanglify Reset Password`, // Subject line
      text: `Click the following link to reset your password on Untanglify: ${url}`, // plain text body
      html: `<a href=${url}><button>Click to Reset Password</button></a>`, // html body
    };

    let info = await transport.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    return err;
  }
}
