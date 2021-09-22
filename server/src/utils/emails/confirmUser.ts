"use strict";
const nodemailer = require("nodemailer");

export async function sendConfirmationMail(
  email: string,
  username: string,
  token: string
) {
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
    subject: `Confirm your account.`, // Subject line
    text: "", // plain text body
    html: `Hi ${username}, <br/>Please confirm your account by clicking the link below.<br/><a href="http://localhost:3000/users/confirm/${token}">Click me</a>`, // html body
  };

  let info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
