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
exports.SecurityController = void 0;
const user_class_1 = require("../clases/user.class");
const invalid_credentials_exception_1 = require("../exceptions/invalid-credentials.exception");
const user_exist_exception_1 = require("../exceptions/user-exist.exception");
class SecurityController {
    constructor() {
    }
    signUp(firstname, lastname, identification, identificationType, email, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const userClass = new user_class_1.UserClass('system');
            try {
                yield userClass.findByEmail(email);
            }
            catch (e) {
                yield userClass.addNewUser(firstname, lastname, identification, identificationType, email, phone);
                console.log('pasa el add');
                yield userClass.getUser();
                return userClass.sendPasswordEmail();
            }
            throw new user_exist_exception_1.UserExistException().getError();
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userClass = new user_class_1.UserClass('system');
            yield userClass.findByEmail(email);
            const isValidPassword = yield userClass.isValidPassword(password);
            if (!isValidPassword) {
                throw new invalid_credentials_exception_1.InvalidCredentialsException().getError();
            }
            const token = yield userClass.generateLoginToken();
            return { token: token, user: userClass.getFullName() };
        });
    }
}
exports.SecurityController = SecurityController;
