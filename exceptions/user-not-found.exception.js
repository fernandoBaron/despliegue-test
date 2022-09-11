"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundException = void 0;
const abstract_exception_1 = require("./abstract-exception");
class UserNotFoundException extends abstract_exception_1.AbstractException {
    constructor() {
        super();
        this.setValues();
    }
    setValues() {
        this.code = 404;
        this.err = 'User not found';
        this.message = 'Usuario no encontrado';
        this.ok = false;
    }
}
exports.UserNotFoundException = UserNotFoundException;
