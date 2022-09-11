"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordRecoveryCodeIncorrectException = void 0;
const abstract_exception_1 = require("./abstract-exception");
class PasswordRecoveryCodeIncorrectException extends abstract_exception_1.AbstractException {
    constructor() {
        super();
        this.setValues();
    }
    setValues() {
        this.code = 400;
        this.err = 'Incorrect code';
        this.message = 'Código incorrecto';
        this.ok = false;
    }
}
exports.PasswordRecoveryCodeIncorrectException = PasswordRecoveryCodeIncorrectException;
