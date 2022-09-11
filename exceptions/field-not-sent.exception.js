"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldNotSentException = void 0;
const abstract_exception_1 = require("./abstract-exception");
class FieldNotSentException extends abstract_exception_1.AbstractException {
    constructor(field) {
        super();
        this.field = field;
        this.setValues();
    }
    setValues() {
        this.code = 400;
        this.err = `${this.field} not sent`;
        this.message = `${this.field} no enviado`;
        this.ok = false;
    }
}
exports.FieldNotSentException = FieldNotSentException;
