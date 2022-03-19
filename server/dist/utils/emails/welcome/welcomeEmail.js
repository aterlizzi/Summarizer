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
exports.sendWelcomeMail = void 0;
const googleapi_1 = require("../../googleapi");
("use strict");
const nodemailer = require("nodemailer");
function sendWelcomeMail(username, email) {
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
                    subject: `Welcome to Untanglify`,
                    text: `Hi ${username}, 

Welcome to Untanglify! We are a community of readers just trying to expand our knowledge and read even faster. 
        
We're glad you've decided to join us and hope we can make it worth your while.
        
In the next few days expect some tips and suggestions coming your way so we can make the most of your experience. If you ever need anything, please feel free to contact Customer Support at https://untanglify.com/contact.
        
If you decide to stay, consider helping us expand through our referral program at https://untanglify.com/referral. You'd be doing us a favor so we'd make it worth your while.
        
Best, 
The Untanglify Team`,
                    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="color-scheme" content="only">
            <title>Email Structure Untanglify</title>
          </head>
          <body style="margin:0;padding:0;background:#121212;">
            <center class="wrapper" style="width:100%;table-layout:fixed;background:#121212;padding-bottom:40px;">
              <div class="webkit" style="max-width:500px;">
                <table class="outer" align="center" style="Margin:0 auto;max-width:500px;width:100%;border-spacing:0;font-family:sans-serif;color:#ffffff99;">
                  <tr>
                    <td style="padding-top:20px;padding-bottom:40px;">
                      <table width="100%" style="border-spacing:0;">
                        <tr>
                          <td width="100%" style="padding:0;text-align:center;">
                            <h3 style="display:inline-block;color:#ffffffde;Margin:0;font-size:45px;">Untanglify</h3>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px;background:#4740d1;">
                      <table width="100%" style="border-spacing:0;">
                        <tr>
                          <td style="padding:0;font-size:25px;color:#ffffffde;">
                            <h4 style="Margin:0;">
                              Welcome to Untanglify!
                            </h4>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0;background:#564ee2;" width="100%" height="5"></td>
                  </tr>
                  <tr>
                    <td style="background:#ffffff0d;padding: 20px;color: #ffffff99;">
                      <table width="100%" style="border-spacing:0;">
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              Hi ${username},
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              Welcome to <span style="color: #bb86fc;">Untanglify!</span> We are a community of readers just trying to expand our knowledge and read even faster. 
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              We're glad you've decided to join us and hope we can make it worth your while. 
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              In the next few days expect some tips and suggestions coming your way so we can make the most of your experience. Despite all that, if you ever need anything, please feel free to contact
                              <a href="https://untanglify.com/contact" style="text-decoration: none;">
                                <span style="color: #bb86fc;">Customer Support.</span>
                              </a>                            
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              If you decide to stay, consider helping us expand through our 
                              <a href="https://untanglify.com/referral" style="text-decoration: none;">
                                <span style="color: #bb86fc;">Referral Program.</span>
                              </a> You'd be doing us a favor so we'll give you some good rewards for your effort.
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              Oh, and you can change your preferences for the emails you receive 
                              <a href="https://untanglify.com/users/settings?reminders=true" style="text-decoration: none;">
                                  <span style="color: #bb86fc;">here.</span>
                              </a> 
                              My inbox is currently at 10,000+ emails so needless to say most of us understand the frustration.
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0px;color: #ffffff99;">
                            <p style="Margin:0;">
                              Best,
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              The Untanglify Team.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </center>
          </body>
        </html>`,
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
                    subject: `Welcome to Untanglify`,
                    text: `Hi ${username}, 

Welcome to Untanglify! We are a community of readers just trying to expand our knowledge and read even faster. 
        
We're glad you've decided to join us and hope we can make it worth your while.
        
In the next few days expect some tips and suggestions coming your way so we can make the most of your experience. If you ever need anything, please feel free to contact Customer Support at https://untanglify.com/contact.
        
If you decide to stay, consider helping us expand through our referral program at https://untanglify.com/referral. You'd be doing us a favor so we'd make it worth your while.
        
Best, 
The Untanglify Team`,
                    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="color-scheme" content="only">
            <title>Email Structure Untanglify</title>
          </head>
          <body style="margin:0;padding:0;background:#121212;">
            <center class="wrapper" style="width:100%;table-layout:fixed;background:#121212;padding-bottom:40px;">
              <div class="webkit" style="max-width:500px;">
                <table class="outer" align="center" style="Margin:0 auto;max-width:500px;width:100%;border-spacing:0;font-family:sans-serif;color:#ffffff99;">
                  <tr>
                    <td style="padding-top:20px;padding-bottom:40px;">
                      <table width="100%" style="border-spacing:0;">
                        <tr>
                          <td width="100%" style="padding:0;text-align:center;">
                            <h3 style="display:inline-block;color:#ffffffde;Margin:0;font-size:45px;">Untanglify</h3>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px;background:#4740d1;">
                      <table width="100%" style="border-spacing:0;">
                        <tr>
                          <td style="padding:0;font-size:25px;color:#ffffffde;">
                            <h4 style="Margin:0;">
                              Welcome to Untanglify!
                            </h4>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0;background:#564ee2;" width="100%" height="5"></td>
                  </tr>
                  <tr>
                    <td style="background:#ffffff0d;padding: 20px;color: #ffffff99;">
                      <table width="100%" style="border-spacing:0;">
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              Hi ${username},
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              Welcome to <span style="color: #bb86fc;">Untanglify!</span> We are a community of readers just trying to expand our knowledge and read even faster. 
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              We're glad you've decided to join us and hope we can make it worth your while. 
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              In the next few days expect some tips and suggestions coming your way so we can make the most of your experience. Despite all that, if you ever need anything, please feel free to contact
                              <a href="https://untanglify.com/contact" style="text-decoration: none;">
                                <span style="color: #bb86fc;">Customer Support.</span>
                              </a>                            
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              If you decide to stay, consider helping us expand through our 
                              <a href="https://untanglify.com/referral" style="text-decoration: none;">
                                <span style="color: #bb86fc;">Referral Program.</span>
                              </a> You'd be doing us a favor so we'll give you some good rewards for your effort.
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              Oh, and you can change your preferences for the emails you receive 
                              <a href="https://untanglify.com/users/settings?reminders=true" style="text-decoration: none;">
                                  <span style="color: #bb86fc;">here.</span>
                              </a> 
                              My inbox is currently at 10,000+ emails so needless to say most of us understand the frustration.
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0px;color: #ffffff99;">
                            <p style="Margin:0;">
                              Best,
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              The Untanglify Team.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </center>
          </body>
        </html>`,
                };
                let info = yield transporter.sendMail(mailOptions);
                console.log("Message sent: %s", info.messageId);
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            }
        }
        catch (err) {
            return err;
        }
    });
}
exports.sendWelcomeMail = sendWelcomeMail;
//# sourceMappingURL=welcomeEmail.js.map