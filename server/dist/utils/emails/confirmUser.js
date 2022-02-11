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
const nodemailer = require("nodemailer");
function sendConfirmationMail(email, username, code) {
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
            subject: `Confirm your account.`,
            text: "",
            html: `Hi ${username}, <br/><p>Your verification code is: </p><br/><h1>${code}</h1><br/><p>If you did not request a verification code, you can ignore this email.</p>`,
        };
        let info = yield transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
}
exports.sendConfirmationMail = sendConfirmationMail;
//# sourceMappingURL=confirmUser.js.map