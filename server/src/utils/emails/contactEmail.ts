"use strict";
const nodemailer = require("nodemailer");

export async function sendContactMail(
  email: string,
  subject: string,
  text: string,
  name: string
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
    to: "act5@rice.edu", // list of receivers
    subject: `Contact Form: ${subject}`, // Subject line
    text: "", // plain text body
    html: `<h1>From: <b>${name}</b></h1></br><h5>${email}</h5><br/><p>Text: ${text}</p>`, // html body
  };

  let info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
