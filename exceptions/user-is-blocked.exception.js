"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIsBlockedException = void 0;
const abstract_exception_1 = require("./abstract-exception");
class UserIsBlockedException extends abstract_exception_1.AbstractException {
    constructor() {
        super();
        this.setValues();
    }
    setValues() {
        this.code = 403;
        this.err = 'User is blocked';
        this.message = 'Usuario está bloqueado';
        this.ok = false;
    }
}
exports.UserIsBlockedException = UserIsBlockedException;
