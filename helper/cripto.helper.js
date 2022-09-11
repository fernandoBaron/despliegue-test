"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriptoHelper = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
class CriptoHelper {
    encode(plainSecretWord) {
        return new Promise((resolve, reject) => {
            bcrypt_1.default.hash(plainSecretWord, 10, (err, hash) => {
                if (err) {
                    reject(err);
                }
                else {
                    console.log(hash);
                    resolve(hash);
                }
            });
        });
    }
    decode(plainSecretWord, encodeSecretWord) {
        return new Promise((resolve, reject) => {
            bcrypt_1.default.compare(plainSecretWord, encodeSecretWord, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (result) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    }
    hashCode(plainSecretWord, seed = 0) {
        const SALT = this.generateNumberBetween(1, 100000).toString();
        return crypto_1.default.createHmac('sha256', SALT)
            .update(plainSecretWord + SALT)
            .digest('hex')
            .substring(0, 20);
    }
    hashCodeFull(plainSecretWord, seed = 0) {
        const SALT = this.generateNumberBetween(1, 100000).toString();
        return crypto_1.default.createHmac('sha256', SALT)
            .update(plainSecretWord + SALT)
            .digest('hex');
    }
    getHashHex() {
        return crypto_1.default.createHash('md5').update(new Date().getTime().toString()).digest('hex');
    }
    generateNumberBetween(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
exports.CriptoHelper = CriptoHelper;
//
