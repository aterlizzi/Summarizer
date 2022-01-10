"use strict";
const nodemailer = require("nodemailer");

export async function sendConfirmationMail(
  email: string,
  username: string,
  code: string
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
    html: `Hi ${username}, <br/><p>Your verification code is: </p><br/><h1>${code}</h1><br/><p>If you did not request a verification code, you can ignore this email.</p>`, // html body
  };

  let info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
