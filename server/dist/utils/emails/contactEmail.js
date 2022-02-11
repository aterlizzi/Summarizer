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
exports.sendContactMail = void 0;
const nodemailer = require("nodemailer");
function sendContactMail(email, subject, text, name) {
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
            to: "act5@rice.edu",
            subject: `Contact Form: ${subject}`,
            text: "",
            html: `<h1>From: <b>${name}</b></h1></br><h5>${email}</h5><br/><p>Text: ${text}</p>`,
        };
        let info = yield transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
}
exports.sendContactMail = sendContactMail;
//# sourceMappingURL=contactEmail.js.map