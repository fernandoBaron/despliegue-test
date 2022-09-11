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
exports.UserClass = void 0;
const cripto_helper_1 = require("../helper/cripto.helper");
const common_helper_1 = require("../helper/common.helper");
const user_not_found_exception_1 = require("../exceptions/user-not-found.exception");
const bcrypt_1 = __importDefault(require("bcrypt"));
const environment_1 = require("../global/environment");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const general_exception_not_found_exception_1 = require("../exceptions/general-exception-not-found.exception");
const unexpected_error_exception_1 = require("../exceptions/unexpected-error.exception");
const email_not_send_exception_1 = require("../exceptions/email-not-send.exception");
const mailer_1 = require("../server/mailer");
class UserClass {
    constructor(currentUserEmail) {
        this.currentUserEmail = currentUserEmail;
    }
    //Finders
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({
                where: {
                    id: userId
                },
            });
            if (!user) {
                throw new user_not_found_exception_1.UserNotFoundException().getError();
            }
            try {
                this.user = user;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({
                where: {
                    email
                }
            });
            if (!user) {
                throw new user_not_found_exception_1.UserNotFoundException().getError();
            }
            this.user = user;
        });
    }
    //Getters
    getId() {
        if (!this.user) {
            throw new user_not_found_exception_1.UserNotFoundException().getError();
        }
        return this.user.id;
    }
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.user) {
                throw new user_not_found_exception_1.UserNotFoundException().getError();
            }
            return this.user;
        });
    }
    getFullName() {
        if (!this.user) {
            throw new user_not_found_exception_1.UserNotFoundException().getError();
        }
        return this.user.firstname + ' ' + this.user.lastname;
    }
    //Validations 
    isValidPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (!this.user) {
                    throw new user_not_found_exception_1.UserNotFoundException().getError();
                }
                const criptoHelper = new cripto_helper_1.CriptoHelper();
                const isValidPassword = yield criptoHelper.decode(password, this.user.password);
                resolve(isValidPassword);
            }));
        });
    }
    //Functionality
    addNewUser(firstname, lastname, identification, identificationType, email, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.build({
                firstname: firstname,
                lastname: lastname,
                identification: identification,
                identificationType: identificationType,
                email: email,
                phone: phone,
                createdBy: email,
                createdAt: new Date(),
            });
            try {
                yield user.save();
                this.user = user;
            }
            catch (e) {
                throw new general_exception_not_found_exception_1.GeneralExceptionNotFoundException(e).getError();
            }
        });
    }
    generateLoginToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.user) {
                throw new user_not_found_exception_1.UserNotFoundException().getError();
            }
            return jsonwebtoken_1.default.sign({ userDB: this.user }, environment_1.TOKEN_SEED, { expiresIn: 31104000 });
        });
    }
    changePassword(newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entra al change');
            return new Promise((resolve, reject) => {
                bcrypt_1.default.hash(newPassword, 10, (err, result) => __awaiter(this, void 0, void 0, function* () {
                    if (!this.user) {
                        throw new user_not_found_exception_1.UserNotFoundException().getError();
                    }
                    this.user.password = result;
                    this.user.save();
                    resolve(true);
                }));
            });
        });
    }
    setLocation(latitude, longitude) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.user) {
                throw new user_not_found_exception_1.UserNotFoundException().getError();
            }
            this.user.latitude = latitude;
            this.user.longitude = longitude;
            this.user.updatedBy = this.currentUserEmail;
            this.user.updatedAt = new Date(),
                yield this.user.save();
        });
    }
    setDocumentFrontImage(documentFrontImage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.user) {
                throw new user_not_found_exception_1.UserNotFoundException().getError();
            }
            const folder = 'uploads/documents/';
            this.user.documentFrontImage = yield this.uploadNewFile(documentFrontImage, folder);
            this.user.updatedBy = this.currentUserEmail;
            this.user.updatedAt = new Date(),
                yield this.user.save();
        });
    }
    setDocumentBackImage(documentBackImage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.user) {
                throw new user_not_found_exception_1.UserNotFoundException().getError();
            }
            const folder = 'uploads/documents/';
            this.user.documentBackImage = yield this.uploadNewFile(documentBackImage, folder);
            this.user.updatedBy = this.currentUserEmail;
            this.user.updatedAt = new Date(),
                yield this.user.save();
        });
    }
    uploadNewFile(image, folder) {
        return __awaiter(this, void 0, void 0, function* () {
            const filename = image.name;
            const filenameArray = filename.split(".");
            const cryptoHelper = new cripto_helper_1.CriptoHelper();
            const hashName = cryptoHelper.getHashHex();
            const newName = hashName + '.' + filenameArray[filenameArray.length - 1];
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                image.mv(`${folder}` + newName, (error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(newName);
                    }
                });
            }));
        });
    }
    sendPasswordEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.user) {
                throw new user_not_found_exception_1.UserNotFoundException().getError();
            }
            const commonHelperEmail = new common_helper_1.CommonHelper();
            const newPassword = this.user.firstname + commonHelperEmail.generateNumberBetween(100000, 999999);
            const cryptoHelper = new cripto_helper_1.CriptoHelper();
            let userPassword;
            try {
                userPassword = yield cryptoHelper.encode(newPassword);
            }
            catch (e) {
                throw new unexpected_error_exception_1.UnexpectedErrorException().getError();
            }
            this.user.password = userPassword;
            yield this.user.save();
            const to = this.user.email;
            const subject = 'Contraseña del Test de Evaluación';
            const html = `
            <h1>Credenciales de Ingreso</h1>
            <p>
            Este es su usuario y contraseña de Ingreso al App:
            </p>
            <h2>USUARIO:    ${this.user.email}</h2>
            <h2>CONTRASEÑA: ${newPassword}</h2>
            <p>
            Por favor ingrese al app e ingrese sus credenciales.
            </p>
            <p>
                Cordialmente,
            </p>
            <br>
            <br>
            <br>
            <p>
            Fernando Alberto Barón Alfonso <br>
            Nuevo Fichaje OetGroup
            </p>
    
    `;
            const text = `
    Credenciales de Ingreso
    
    Este es su usuario y contraseña de Ingreso al App:
    USUARIO:    ${this.user.email}
    CONTRASEÑA: ${newPassword}
    
    Por favor ingrese al app e ingrese sus credenciales.
    
    
    Cordialmente,
    
    
    Fernando Alberto Barón Alfonso 
    Nuevo Fichaje OetGroup
    `;
            const mail = new mailer_1.Mailer();
            try {
                yield mail.sendMail(to, subject, html, text);
            }
            catch (e) {
                throw new email_not_send_exception_1.EmailNotSendException().getError();
            }
        });
    }
    ;
}
exports.UserClass = UserClass;
