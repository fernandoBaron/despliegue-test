"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentialsException = void 0;
const abstract_exception_1 = require("./abstract-exception");
class InvalidCredentialsException extends abstract_exception_1.AbstractException {
    constructor() {
        super();
        this.setValues();
    }
    setValues() {
        this.code = 404;
        this.err = 'Invalid Credentials';
        this.message = 'Credenciales inválidas';
        this.ok = false;
    }
}
exports.InvalidCredentialsException = InvalidCredentialsException;
