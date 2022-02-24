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
exports.sendChangeEmailMail = void 0;
const googleapi_1 = require("./../googleapi");
("use strict");
const nodemailer = require("nodemailer");
function sendChangeEmailMail(email, username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
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
                subject: `[ACTION REQUIRED] Email Updated`,
                text: `Hi ${username}, please confirm your account by clicking the link below.`,
                html: `Hi ${username}, <br/>Please confirm your account by clicking the link below.<br/>`,
            };
            let info = yield transport.sendMail(mailOptions);
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
        catch (err) {
            return err;
        }
    });
}
exports.sendChangeEmailMail = sendChangeEmailMail;
//# sourceMappingURL=changeEmail.js.map