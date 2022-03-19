import { GetAccessToken } from "../../googleapi";
("use strict");
const nodemailer = require("nodemailer");

export async function sendChangeEmailToOwnerMail(
  username: string,
  email: string
) {
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
        subject: `Untanglify Email Change Requested`, // Subject line
        text: `Hi ${username}, 

We got a request to change the email associated with your Untanglify account.
        
If this was you, you can ignore this email.
        
If this wasn't you, and you fear your account might be in jeopardy, please contact Customer Support at https://untanglify.com/contact.
        
Rest assured, as long as your password is not jeopardized, your email cannot be changed by a third party.
        
Best, 
The Untanglify Team`,
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
                We Got A Request To Change Your Email
              </h3>
            </header>
            <section style="padding: 1em; display: flex; flex-direction: column;">
              <p style="color: rgba(255, 255, 255, .6); margin: 0em">
                Hi ${username}, 
                <br /> <br />
                We got a request to change the email associated with your Untanglify account.
                <br /> <br />
                If this was you, you can ignore this email.
                <br /> <br />
                If this wasn't you, and you fear your account might be in jeopardy, please contact
                <a href="https://untanglify.com/contact" style="text-decoration: none;">
                  <span style="color: #bb86fc;">Customer Support.</span>
                </a>
                <br /> <br />
                Best,
                <br />
                The Untanglify Team.
              </p>
            </section>
          </div>
        </main>`,
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
        subject: `Untanglify Email Change Requested`, // Subject line
        text: `Hi ${username}, 

We got a request to change the email associated with your Untanglify account.
        
If this was you, you can ignore this email.
        
If this wasn't you, and you fear your account might be in jeopardy, please contact Customer Support at https://untanglify.com/contact.
        
Rest assured, as long as your password is not jeopardized, your email cannot be changed by a third party.
        
Best, 
The Untanglify Team`,
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
                We Got A Request To Change Your Email
              </h3>
            </header>
            <section style="padding: 1em; display: flex; flex-direction: column;">
              <p style="color: rgba(255, 255, 255, .6); margin: 0em 0em 1em 0em">
                Hi ${username}, 
                <br /> <br />
                We got a request to change the email associated with your Untanglify account.
                <br /> <br />
                If this was you, you can ignore this email.
                <br /> <br />
                If this wasn't you, and you fear your account might be in jeopardy, please contact
                <a href="https://untanglify.com/contact" style="text-decoration: none;">
                  <span style="color: #bb86fc;">Customer Support.</span>
                </a>
                <br /> <br />
                Best,
                <br />
                The Untanglify Team.
              </p>
            </section>
          </div>
        </main>`,
      };

      let info = await transporter.sendMail(mailOptions);

      console.log("Message sent: %s", info.messageId);

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  } catch (err) {
    return err;
  }
}
