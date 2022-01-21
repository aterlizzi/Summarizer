"use strict";
const nodemailer = require("nodemailer");

export async function sendForgotPasswordEmail(email: string, token: string) {
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
    to: email, // list of receivers
    subject: `Untanglify Reset Password`, // Subject line
    text: "", // plain text body
    html: `<a href='http://localhost:3000/users/forgot-password/${token}'><button>Click to Reset Password</button></a>`, // html body
  };

  let info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
