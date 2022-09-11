"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordInvalidException = void 0;
const abstract_exception_1 = require("./abstract-exception");
class PasswordInvalidException extends abstract_exception_1.AbstractException {
    constructor() {
        super();
        this.setValues();
    }
    setValues() {
        this.code = 400;
        this.err = 'Invalid password';
        this.message = 'Password inválido';
        this.ok = false;
    }
}
exports.PasswordInvalidException = PasswordInvalidException;
