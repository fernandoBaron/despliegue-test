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
exports.UserController = void 0;
const user_class_1 = require("../clases/user.class");
const password_invalid_exception_1 = require("../exceptions/password-invalid.exception");
class UserController {
    constructor(currentUser) {
        this.currentUser = currentUser;
    }
    get(currentUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userClass = new user_class_1.UserClass(this.currentUser.email);
            yield userClass.findById(currentUserId);
            return yield userClass.getUser();
        });
    }
    changePassword(oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entra al controller', this.currentUser.email);
            const userClass = new user_class_1.UserClass(this.currentUser.email);
            console.log('pasa');
            const userId = this.currentUser.id;
            console.log(userId, 'userId');
            yield userClass.findById(userId);
            console.log('encuentra el user');
            const passwordVerified = yield userClass.isValidPassword(oldPassword);
            if (!passwordVerified) {
                throw new password_invalid_exception_1.PasswordInvalidException().getError();
            }
            console.log('valida el password');
            yield userClass.changePassword(newPassword);
        });
    }
    setLocation(latitude, longitude) {
        return __awaiter(this, void 0, void 0, function* () {
            const userClass = new user_class_1.UserClass(this.currentUser.email);
            const userId = this.currentUser.id;
            yield userClass.findById(userId);
            yield userClass.setLocation(latitude, longitude);
        });
    }
    uploadDocumentFrontImage(documentFrontImage) {
        return __awaiter(this, void 0, void 0, function* () {
            const userClass = new user_class_1.UserClass(this.currentUser.email);
            const userId = this.currentUser.id;
            yield userClass.findById(userId);
            yield userClass.setDocumentFrontImage(documentFrontImage);
        });
    }
    uploadDocumentBackImage(documentBackImage) {
        return __awaiter(this, void 0, void 0, function* () {
            const userClass = new user_class_1.UserClass(this.currentUser.email);
            const userId = this.currentUser.id;
            yield userClass.findById(userId);
            yield userClass.setDocumentBackImage(documentBackImage);
        });
    }
}
exports.UserController = UserController;
