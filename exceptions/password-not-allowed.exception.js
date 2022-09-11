"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordNotAllowedException = void 0;
const abstract_exception_1 = require("./abstract-exception");
class PasswordNotAllowedException extends abstract_exception_1.AbstractException {
    constructor() {
        super();
        this.setValues();
    }
    setValues() {
        this.code = 400;
        this.err = 'password must be longer 6 chars';
        this.message = 'La contraseña debe ser mayor a 6 carácteres';
        this.ok = false;
    }
}
exports.PasswordNotAllowedException = PasswordNotAllowedException;
