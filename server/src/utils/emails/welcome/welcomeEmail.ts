import { GetAccessToken } from "../../googleapi";
("use strict");
const nodemailer = require("nodemailer");

export async function sendWelcomeMail(username: string, email: string) {
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
        subject: `Welcome to Untanglify`, // Subject line
        text: `Hi ${username}, 

Welcome to Untanglify! We are a community of readers just trying to expand our knowledge and read even faster. 
        
We're glad you've decided to join us and hope we can make it worth your while.
        
In the next few days expect some tips and suggestions coming your way so we can make the most of your experience. If you ever need anything, please feel free to contact Customer Support at https://untanglify.com/contact.
        
If you decide to stay, consider helping us expand through our referral program at https://untanglify.com/referral. You'd be doing us a favor so we'd make it worth your while.
        
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
                Welcome to Untanglify!
              </h3>
            </header>
            <section style="padding: 1em; display: flex; flex-direction: column;">
              <p style="color: rgba(255, 255, 255, .6); margin: 0em 0em 1em 0em">
                Hi ${username}, 
                <br /> <br />
                Welcome to <span style="color: #bb86fc;">Untanglify!</span> We are a community of readers just trying to expand our knowledge and read even faster. 
                <br /> <br />
                We're glad you've decided to join us and hope we can make it worth your while. 
                <br /> <br />
                In the next few days expect some tips and suggestions coming your way so we can make the most of your experience. Despite all that, if you ever need anything, please feel free to contact
                <a href="https://untanglify.com/contact" style="text-decoration: none;">
                  <span style="color: #bb86fc;">Customer Support.</span>
                </a>
                <br /> <br />
                If you decide to stay, consider helping us expand through our 
                <a href="https://untanglify.com/referral" style="text-decoration: none;">
                    <span style="color: #bb86fc;">Referral Program.</span>
                </a> You'd be doing us a favor so we'll give you some good rewards for your effort.
                <br /> <br />
                Oh, and you can change your preferences for the emails you receive 
                <a href="https://untanglify.com/users/settings?reminders=true" style="text-decoration: none;">
                    <span style="color: #bb86fc;">here.</span>
                </a> 
                My inbox is currently at 10,000+ emails so needless to say most of us understand the frustration.
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
        subject: `Welcome to Untanglify`, // Subject line
        text: `Hi ${username}, 

Welcome to Untanglify! We are a community of readers just trying to expand our knowledge and read even faster. 
        
We're glad you've decided to join us and hope we can make it worth your while.
        
In the next few days expect some tips and suggestions coming your way so we can make the most of your experience. If you ever need anything, please feel free to contact Customer Support at https://untanglify.com/contact.
        
If you decide to stay, consider helping us expand through our referral program at https://untanglify.com/referral. You'd be doing us a favor so we'd make it worth your while.
        
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
                Welcome to Untanglify!
              </h3>
            </header>
            <section style="padding: 1em; display: flex; flex-direction: column;">
              <p style="color: rgba(255, 255, 255, .6); margin: 0em 0em 1em 0em">
                Hi ${username}, 
                <br /> <br />
                Welcome to <span style="color: #bb86fc;">Untanglify!</span> We are a community of readers just trying to expand our knowledge and read even faster. 
                <br /> <br />
                We're glad you've decided to join us and hope we can make it worth your while. 
                <br /> <br />
                In the next few days expect some tips and suggestions coming your way so we can make the most of your experience. Despite all that, if you ever need anything, please feel free to contact
                <a href="https://untanglify.com/contact" style="text-decoration: none;">
                  <span style="color: #bb86fc;">Customer Support.</span>
                </a>
                <br /> <br />
                If you decide to stay, consider helping us expand through our 
                <a href="https://untanglify.com/referral" style="text-decoration: none;">
                    <span style="color: #bb86fc;">Referral Program.</span>
                </a> You'd be doing us a favor so we'll give you some good rewards for your effort.
                <br /> <br />
                Oh, and you can change your preferences for the emails you receive 
                <a href="https://untanglify.com/users/settings?reminders=true" style="text-decoration: none;">
                    <span style="color: #bb86fc;">here.</span>
                </a> 
                My inbox is currently at 10,000+ emails so needless to say most of us understand the frustration.
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
