"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserExistException = void 0;
const abstract_exception_1 = require("./abstract-exception");
class UserExistException extends abstract_exception_1.AbstractException {
    constructor() {
        super();
        this.setValues();
    }
    setValues() {
        this.code = 400;
        this.err = 'user already exist';
        this.message = 'El usuario ya existe';
        this.ok = false;
    }
}
exports.UserExistException = UserExistException;
