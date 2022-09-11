"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotAuthException = void 0;
const abstract_exception_1 = require("./abstract-exception");
class UserNotAuthException extends abstract_exception_1.AbstractException {
    constructor() {
        super();
        this.setValues();
    }
    setValues() {
        this.code = 403;
        this.err = 'User unauthorized';
        this.message = 'Usuario no autorizado';
        this.ok = false;
    }
}
exports.UserNotAuthException = UserNotAuthException;
