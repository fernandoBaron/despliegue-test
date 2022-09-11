"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralExceptionNotFoundException = void 0;
const abstract_exception_1 = require("./abstract-exception");
class GeneralExceptionNotFoundException extends abstract_exception_1.AbstractException {
    constructor(e) {
        super();
        this.e = e;
        this.setValues();
    }
    setValues() {
        this.code = 401;
        this.err = 'General Error';
        this.message = 'Error indeterminado';
        this.ok = false;
    }
    getError() {
        let object = Object.assign({}, super.getError());
        object.details = this.e;
        return object;
    }
}
exports.GeneralExceptionNotFoundException = GeneralExceptionNotFoundException;
