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
              <div class="webkit" style="max-width:600px;">
                <table class="outer" align="center" style="Margin:0 auto;max-width:600px;width:100%;border-spacing:0;font-family:sans-serif;color:#ffffff99;">
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
                              Invitation to Join Untanglify
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
                    <td style="padding:0;background:#ffffff0d;padding: 20px;color: #ffffff99;">
                      <table width="100%" style="border-spacing:0;">
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              Hi Friend,
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              A user with the username of <span style="color: #bb86fc;">${username}</span> and a member of Untanglify since ${createdAt.toDateString()}, has sent you a 10% discount on your first month of Untanglify!
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              On Untanglify, users learn more and save time by quickly summarizing text. Just sign up by <span style="color: #bb86fc;">${current.toDateString()}</span> to get <span style="color: #bb86fc;">10% off your first month.</span>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              Just click the button below to accept your invitation. 
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              If you need help with any of the steps outlined in this email, please contact
                              <a href="https://untanglify.com/contact" style="text-decoration: none;">
                                <span style="color: #bb86fc;">Customer Support.</span>
                              </a>
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
                        <tr>
                          <td width="100%" style="padding-top:30px;">
                            <table align="center">
                              <tr>
                                <td style="background: #4740d1;border-radius:5px;padding-top:7.5px;padding-bottom:7.5px;padding-left:12.5px;padding-right:12.5px;">
                                  <a href=${referralLink} style="text-decoration: none;color: #ffffffde;">
                                    Accept my Invitation
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </center>
          </body>
        </html>`, // html body
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
              <div class="webkit" style="max-width:600px;">
                <table class="outer" align="center" style="Margin:0 auto;max-width:600px;width:100%;border-spacing:0;font-family:sans-serif;color:#ffffff99;">
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
                              Invitation to Join Untanglify
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
                    <td style="padding:0;background:#ffffff0d;padding: 20px;color: #ffffff99;">
                      <table width="100%" style="border-spacing:0;">
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              Hi Friend,
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              A user with the username of <span style="color: #bb86fc;">${username}</span> and a member of Untanglify since ${createdAt.toDateString()}, has sent you a 10% discount on your first month of Untanglify!
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              On Untanglify, users learn more and save time by quickly summarizing text. Just sign up by <span style="color: #bb86fc;">${current.toDateString()}</span> to get <span style="color: #bb86fc;">10% off your first month.</span>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              Just click the button below to accept your invitation. 
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              If you need help with any of the steps outlined in this email, please contact
                              <a href="https://untanglify.com/contact" style="text-decoration: none;">
                                <span style="color: #bb86fc;">Customer Support.</span>
                              </a>
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
                        <tr>
                          <td width="100%" style="padding-top:30px;">
                            <table align="center">
                              <tr>
                                <td style="background: #4740d1;border-radius:5px;padding-top:7.5px;padding-bottom:7.5px;padding-left:12.5px;padding-right:12.5px;">
                                  <a href=${referralLink} style="text-decoration: none;color: #ffffffde;">
                                    Accept my Invitation
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </center>
          </body>
        </html>`, // html body
      };

      let info = await transporter.sendMail(mailOptions);

      console.log("Message sent: %s", info.messageId);

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  } catch (err) {
    console.log(err);
  }
}
