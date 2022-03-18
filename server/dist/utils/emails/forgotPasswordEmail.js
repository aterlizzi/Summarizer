"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendForgotPasswordEmail = void 0;
const googleapi_1 = require("../googleapi");
const nodemailer = require("nodemailer");
function sendForgotPasswordEmail(email, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = "Aidan";
        const url = process.env.NODE_ENV === "production"
            ? `https://untanglify.com/users/forgot-password/${token}`
            : `http://localhost:4000/users/forgot-password/${token}`;
        try {
            if (process.env.NODE_ENV === "production") {
                const accessToken = (0, googleapi_1.GetAccessToken)();
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
                    subject: `[ACTION REQUIRED] Untanglify Reset Password`,
                    text: `Hi ${username}, 

We got a request for a password change on your Untanglify account.

If this was you, click the link below to reset your password.

If this wasn't you, no worries. You can ignore this email your account is secured.

If you need help with any of the steps outlined in this email, please contact Customer Support at https://untanglify.com/contact.

Best, 
The Untanglify Team

Reset Password Link: ${url}`,
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
                Reset Password Request
              </h3>
            </header>
            <section style="padding: 1em; display: flex; flex-direction: column;">
              <p style="color: rgba(255, 255, 255, .6); margin: 0em">
                Hi ${username}, 
                <br /> <br />
                We got a request for a password change on your Untanglify account.
                <br /> <br />
                If this was you,
                <span style="color: #bb86fc;">click the button below</span> to
                reset your password.
                <br /> <br />
                If this wasn't you, no worries. You can ignore this email your
                account is secured.
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
              <a href=${url} style="margin: 2em 0em 1em 0em;">
                <button style="background: #4740d1; width: 50%; outline: none; border: none; border-radius: .5em; padding: .5em 0em; color: rgba(255, 255, 255, 0.87); cursor: pointer; align-self: center; margin-bottom: 1em; font-size: 1rem;">
                  Reset Password
                </button>
              </a>
            </section>
          </div>
        </main>`,
                };
                let info = yield transport.sendMail(mailOptions);
                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }
            else {
                const testAccount = yield nodemailer.createTestAccount();
                const transporter = nodemailer.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false,
                    auth: {
                        user: testAccount.user,
                        pass: testAccount.pass,
                    },
                });
                const mailOptions = {
                    from: '"Fred Foo 👻" <foo@example.com>',
                    to: email,
                    subject: `[ACTION REQUIRED] Untanglify Reset Password`,
                    text: `Hi ${username}, 

We got a request for a password change on your Untanglify account.

If this was you, click the link below to reset your password.

If this wasn't you, no worries. You can ignore this email your account is secured.

If you need help with any of the steps outlined in this email, please contact Customer Support at https://untanglify.com/contact.

Best, 
The Untanglify Team

Reset Password Link: ${url}`,
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
                Reset Password Request
              </h3>
            </header>
            <section style="padding: 1em; display: flex; flex-direction: column;">
              <p style="color: rgba(255, 255, 255, .6); margin: 0em">
                Hi ${username}, 
                <br /> <br />
                We got a request for a password change on your Untanglify account.
                <br /> <br />
                If this was you,
                <span style="color: #bb86fc;">click the button below</span> to
                reset your password.
                <br /> <br />
                If this wasn't you, no worries. You can ignore this email your
                account is secured.
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
              <a href=${url} style="margin: 2em 0em 1em 0em;">
                <button style="background: #4740d1; width: 50%; outline: none; border: none; border-radius: .5em; padding: .5em 0em; color: rgba(255, 255, 255, 0.87); cursor: pointer; align-self: center; margin-bottom: 1em; font-size: 1rem;">
                  Reset Password
                </button>
              </a>
            </section>
          </div>
        </main>`,
                };
                let info = yield transporter.sendMail(mailOptions);
                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }
        }
        catch (err) {
            console.log(err);
            return err;
        }
    });
}
exports.sendForgotPasswordEmail = sendForgotPasswordEmail;
//# sourceMappingURL=forgotPasswordEmail.js.map