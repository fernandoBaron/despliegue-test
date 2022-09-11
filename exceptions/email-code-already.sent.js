"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailCodeAlreadySent = void 0;
const abstract_exception_1 = require("./abstract-exception");
class EmailCodeAlreadySent extends abstract_exception_1.AbstractException {
    constructor() {
        super();
        this.setValues();
    }
    setValues() {
        this.code = 404;
        this.err = 'Mail already sent';
        this.message = 'El correo ya fue enviado hace menos de dos minutos, por favor verifique su bandeja de correo no deseado o intente de nuevo una vez transcurridos dos minutos...';
        this.ok = false;
    }
}
exports.EmailCodeAlreadySent = EmailCodeAlreadySent;
