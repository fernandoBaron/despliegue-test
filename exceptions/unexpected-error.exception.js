"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnexpectedErrorException = void 0;
const abstract_exception_1 = require("./abstract-exception");
class UnexpectedErrorException extends abstract_exception_1.AbstractException {
    constructor() {
        super();
        this.setValues();
    }
    setValues() {
        this.code = 400;
        this.err = 'Unexpected error 1002';
        this.message = 'Error inesperado 1002';
        this.ok = false;
    }
}
exports.UnexpectedErrorException = UnexpectedErrorException;
