"use strict";

import { GetAccessToken } from "../googleapi";

const nodemailer = require("nodemailer");

export async function sendReferralInviteEmail(
  email: string,
  referralLink: string,
  username: string,
  createdAt: Date
) {
  const now = new Date();
  let current;
  if (now.getMonth() == 11) {
    current = new Date(now.getFullYear() + 1, 0, 1);
  } else {
    current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  }
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
        to: email, // list of receivers
        subject: `You've Been Invited To Untanglify`, // Subject line
        text: `Hi Friend, 

        ${username}, a user of Untanglify since ${createdAt.toDateString()}, has sent you a 10% discount on your first month of Untanglify!
        
        On Untanglify, users learn more and save time by quickly summarizing text. Just sign up by ${current.toDateString()} to get 10% off your first month.
        
        Accept your invitation by clicking this link: ${referralLink}`, // plain text body
        html: `
                <main style="min-height: 100vh; width: 100%; background: #121212; display: flex; flex-direction: column; align-items: center; padding: 2em;">
                  <div style="display: flex; align-items: center;">
                    <p style="color: rgba(255, 255, 255, 0.87); font-size: 2rem;">
                      Untanglify
                    </p>
                  </div>
                  <div style="background: rgba(255, 255, 255, 0.05); border-radius: 2em; max-width: 30em; width: 90%; border: "1px solid rgba(255, 255, 255, 0.08);">
                    <header style="background: #4740d1; border-bottom: 3px solid rgba(255, 255, 255, 0.08); padding: 2em 1em; border-top-left-radius: 2em; border-top-right-radius: 2em;">
                      <h3 style="color: rgba(255, 255, 255, 0.87); margin: 0em;">
                        Invitation to Join Untanglify
                      </h3>
                    </header>
                    <section style="padding: 1em; display: flex; flex-direction: column;">
                      <p style="color: rgba(255, 255, 255, .6); margin: 0em">
                        Hi Friend, 
                        <br /> <br />
                        A user with the username of <span style="color: #bb86fc;">${username}</span> and a member of Untanglify since ${createdAt.toDateString()}, has sent you a 10% discount on your first month of Untanglify!
                        <br /> <br />
                        On Untanglify, users learn more and save time by quickly summarizing text. Just sign up by <span style="color: #bb86fc;">${current.toDateString()}</span> to get <span style="color: #bb86fc;">10% off your first month.</span>
                        <br /> <br />
                        Just click the button below to accept your invitation. 
                        <br /> <br />
                        If you need help with any of the steps outlined in this email, please contact
                        <a href="https://untanglify.com/contact" style="text-decoration: none;">
                          <span style="color: #bb86fc;">Customer Support.</span>
                        </a>
                        <br /> <br />
                        Best,
                        <br />
                        The Untanglify Team.
                      </p>
                      <a href=${referralLink} style="margin: 2em 0em 1em 0em;">
                        <button style="background: #4740d1; width: 50%; outline: none; border: none; border-radius: .5em; padding: .5em 0em; color: rgba(255, 255, 255, 0.87); cursor: pointer; align-self: center; margin-bottom: 1em; font-size: 1rem;">
                          Accept my Invitation
                        </button>
                      </a>
                    </section>
                  </div>
                </main>`, // html body
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
        to: email, // list of receivers
        subject: `You've Been Invited To Untanglify`, // Subject line
        text: `Hi Friend, 

${username}, a user of Untanglify since ${createdAt.toDateString()}, has sent you a 10% discount on your first month of Untanglify!

On Untanglify, users learn more and save time by quickly summarizing text. Just sign up by ${current.toDateString()} to get 10% off your first month.

Accept your invitation by clicking this link: ${referralLink}`, // plain text body
        html: `
        <main style="min-height: 100vh; width: 100%; background: #121212; display: flex; flex-direction: column; align-items: center; padding: 2em;">
          <div style="display: flex; align-items: center;">
            <p style="color: rgba(255, 255, 255, 0.87); font-size: 2rem;">
              Untanglify
            </p>
          </div>
          <div style="background: rgba(255, 255, 255, 0.05); border-radius: 2em; max-width: 30em; width: 90%; border: "1px solid rgba(255, 255, 255, 0.08);">
            <header style="background: #4740d1; border-bottom: 3px solid rgba(255, 255, 255, 0.08); padding: 2em 1em; border-top-left-radius: 2em; border-top-right-radius: 2em;">
              <h3 style="color: rgba(255, 255, 255, 0.87); margin: 0em;">
                Invitation to Join Untanglify
              </h3>
            </header>
            <section style="padding: 1em; display: flex; flex-direction: column;">
              <p style="color: rgba(255, 255, 255, .6); margin: 0em">
                Hi Friend, 
                <br /> <br />
                A user with the username of <span style="color: #bb86fc;">${username}</span> and a member of Untanglify since ${createdAt.toDateString()}, has sent you a 10% discount on your first month of Untanglify!
                <br /> <br />
                On Untanglify, users learn more and save time by quickly summarizing text. Just sign up by <span style="color: #bb86fc;">${current.toDateString()}</span> to get <span style="color: #bb86fc;">10% off your first month.</span>
                <br /> <br />
                Just click the button below to accept your invitation. 
                <br /> <br />
                If you need help with any of the steps outlined in this email, please contact
                <a href="https://untanglify.com/contact" style="text-decoration: none;">
                  <span style="color: #bb86fc;">Customer Support.</span>
                </a>
                <br /> <br />
                Best,
                <br />
                The Untanglify Team.
              </p>
              <a href=${referralLink} style="margin: 2em 0em 1em 0em;">
                <button style="background: #4740d1; width: 50%; outline: none; border: none; border-radius: .5em; padding: .5em 0em; color: rgba(255, 255, 255, 0.87); cursor: pointer; align-self: center; margin-bottom: 1em; font-size: 1rem;">
                  Accept my Invitation
                </button>
              </a>
            </section>
          </div>
        </main>`, // html body
      };

      let info = await transporter.sendMail(mailOptions);

      console.log("Message sent: %s", info.messageId);

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  } catch (err) {
    console.log(err);
  }
}
