import { GetAccessToken } from "../../googleapi";
("use strict");
const nodemailer = require("nodemailer");

export async function sendChangeEmailMail(
  username: string,
  email: string,
  token: string
) {
  const url =
    process.env.NODE_ENV === "production"
      ? `https://untanglify.com/users/change-email/${token}`
      : `http://localhost:4000/users/change-email/${token}`;
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
        subject: `[ACTION REQUIRED] Email Updated`, // Subject line
        text: `Hi ${username}, 

        We got a request to change the email associated with your Untanglify account.
        
        If this was you, click the link below to confirm the change to the email associated with your Untanglify account.
        
        If this wasn't you, no worries. You can ignore this email.
        
        If you need help with any of the steps outlined in this email, please contact Customer Support at https://untanglify.com/contact.
        
        Best, 
        The Untanglify Team
        
        Confirm Email Change Link: ${url}`,
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
                              Change Email Request
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
                              We got a request to change the email associated with your Untanglify account.
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              If this was you, <span style="color: #bb86fc;">click the button below</span> to confirm the change to the email associated with your Untanglify account.
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              If this wasn't you, no worries. You can ignore this email.
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
                                  <a href=${url} style="text-decoration: none;color: #ffffffde;">
                                    Confirm Email Change
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
        </html>`,
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
        subject: `[ACTION REQUIRED] Email Updated`, // Subject line
        text: `Hi ${username}, 

        We got a request to change the email associated with your Untanglify account.
        
        If this was you, click the link below to confirm the change to the email associated with your Untanglify account.
        
        If this wasn't you, no worries. You can ignore this email.
        
        If you need help with any of the steps outlined in this email, please contact Customer Support at https://untanglify.com/contact.
        
        Best, 
        The Untanglify Team
        
        Confirm Email Change Link: ${url}`,
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
                              Change Email Request
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
                              We got a request to change the email associated with your Untanglify account.
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              If this was you, <span style="color: #bb86fc;">click the button below</span> to confirm the change to the email associated with your Untanglify account.
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding-bottom:10px;color: #ffffff99;">
                            <p style="Margin:0;">
                              If this wasn't you, no worries. You can ignore this email.
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
                                  <a href=${url} style="text-decoration: none;color: #ffffffde;">
                                    Confirm Email Change
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
        </html>`,
      };

      let info = await transporter.sendMail(mailOptions);

      console.log("Message sent: %s", info.messageId);

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  } catch (err) {
    return err;
  }
}
