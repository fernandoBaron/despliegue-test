"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVerifiedCantBeModifyException = void 0;
const abstract_exception_1 = require("./abstract-exception");
class EmailVerifiedCantBeModifyException extends abstract_exception_1.AbstractException {
    constructor() {
        super();
        this.setValues();
    }
    setValues() {
        this.code = 400;
        this.err = 'Email verified can not be modified';
        this.message = 'El email ya ha sido verificado y no se puede cambiar';
        this.ok = false;
    }
}
exports.EmailVerifiedCantBeModifyException = EmailVerifiedCantBeModifyException;
