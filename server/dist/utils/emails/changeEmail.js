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
const nodemailer = require("nodemailer");
function sendChangeEmailMail(email, username) {
    return __awaiter(this, void 0, void 0, function* () {
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
            subject: `[ACTION REQUIRED] Email Updated`,
            text: "",
            html: `Hi ${username}, <br/>Please confirm your account by clicking the link below.<br/>`,
        };
        let info = yield transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
}
exports.sendChangeEmailMail = sendChangeEmailMail;
//# sourceMappingURL=changeEmail.js.map