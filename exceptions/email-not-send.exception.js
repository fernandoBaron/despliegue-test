"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailNotSendException = void 0;
const abstract_exception_1 = require("./abstract-exception");
class EmailNotSendException extends abstract_exception_1.AbstractException {
    constructor() {
        super();
        this.setValues();
    }
    setValues() {
        this.code = 404;
        this.err = 'Mail does not send';
        this.message = 'No fue enviado el correo';
        this.ok = false;
    }
}
exports.EmailNotSendException = EmailNotSendException;
