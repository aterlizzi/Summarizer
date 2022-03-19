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
exports.sendConfirmationMail = void 0;
const googleapi_1 = require("../googleapi");
const nodemailer = require("nodemailer");
function sendConfirmationMail(email, username, code) {
    return __awaiter(this, void 0, void 0, function* () {
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
                    subject: `Confirm Your Untanglify Account`,
                    text: `Hi ${username}, your verification code is: ${code}. If you did not request a verification code you can ignore this email.`,
                    html: `Hi ${username}, <br/><p>Your verification code is: </p><br/><h1>${code}</h1><br/><p>If you did not request a verification code, you can ignore this email.</p>`,
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
                    subject: `Confirm Your Untanglify Account`,
                    text: `Hi ${username}, 

        In order to finish signing up, you must verify your email address.
        
        Verification makes Untanglify a safer place for everyone.
        
        Simply input the code below and your account will be verified, thanks!
        
        Input this code: ${code}`,
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
                        Verify Your Untanglify Account
                      </h3>
                    </header>
                    <section style="padding: 1em; display: flex; flex-direction: column;">
                      <p style="color: rgba(255, 255, 255, .6); margin: 0em">
                        Hi ${username}, 
                        <br /> <br />
                        In order to use Untanglify, you must <span style="color: #bb86fc;">verify</span> your account!
                        <br /> <br />
                        Verification makes Untanglify a safer place for everyone.
                        <br /> <br />
                        Just input the code below to verify your account. 
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
                      <h3 style="align-self: center; color: #bb86fc; margin: 1em 0em .5em 0em; font-size: 1.5rem; letter-spacing: 1.5px">${code}</h3>
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
        }
    });
}
exports.sendConfirmationMail = sendConfirmationMail;
//# sourceMappingURL=confirmUser.js.map