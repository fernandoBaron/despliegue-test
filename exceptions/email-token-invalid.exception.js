"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTokenInvalidException = void 0;
const abstract_exception_1 = require("./abstract-exception");
class EmailTokenInvalidException extends abstract_exception_1.AbstractException {
    constructor() {
        super();
        this.setValues();
    }
    setValues() {
        this.code = 404;
        this.err = 'EmailToken invalid';
        this.message = 'EmailToken no es válido';
        this.ok = false;
    }
}
exports.EmailTokenInvalidException = EmailTokenInvalidException;
