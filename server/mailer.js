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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mailer = void 0;
const emailjs_1 = require("emailjs");
const fs_1 = __importDefault(require("fs"));
class MailerAbstract {
}
class Mailer extends MailerAbstract {
    constructor() {
        super();
        this.USER = '';
        this.PASSWORD = '';
        this.HOST = '';
        const settingsFile = fs_1.default.readFileSync('settings.conf', { encoding: 'utf-8' });
        const settings = JSON.parse(settingsFile);
        this.USER = settings.email_user;
        this.PASSWORD = settings.email_password;
        this.HOST = settings.email_host;
    }
    sendMail(to, subject, html, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = new emailjs_1.SMTPClient({
                user: this.USER,
                password: this.PASSWORD,
                host: this.HOST,
                tls: true,
            });
            const message = {
                text: text,
                from: 'Test evaluativo <no-reply@test-eval.com.co>',
                to,
                subject,
                attachment: [
                    { data: html, alternative: true },
                ],
            };
            return new Promise((resolve, reject) => {
                // @ts-ignore
                client.send(message, function (err, message) {
                    console.log(err || message);
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(message);
                    }
                });
            });
        });
    }
}
exports.Mailer = Mailer;
