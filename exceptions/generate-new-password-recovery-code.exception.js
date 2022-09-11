"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateNewPasswordRecoveryCodeException = void 0;
const abstract_exception_1 = require("./abstract-exception");
class GenerateNewPasswordRecoveryCodeException extends abstract_exception_1.AbstractException {
    constructor() {
        super();
        this.setValues();
    }
    setValues() {
        this.code = 400;
        this.err = 'Generate new code';
        this.message = 'Por favor genere un código nuevo, el código actual está vencido o no existe';
        this.ok = false;
    }
}
exports.GenerateNewPasswordRecoveryCodeException = GenerateNewPasswordRecoveryCodeException;
