"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAlreadyTakenException = void 0;
const abstract_exception_1 = require("./abstract-exception");
class EmailAlreadyTakenException extends abstract_exception_1.AbstractException {
    constructor() {
        super();
        this.setValues();
    }
    setValues() {
        this.code = 400;
        this.err = 'Email is already taken';
        this.message = 'Email ya ha sido usado';
        this.ok = false;
    }
}
exports.EmailAlreadyTakenException = EmailAlreadyTakenException;
