"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleExistException = void 0;
const abstract_exception_1 = require("./abstract-exception");
class VehicleExistException extends abstract_exception_1.AbstractException {
    constructor() {
        super();
        this.setValues();
    }
    setValues() {
        this.code = 400;
        this.err = 'Vehicle already exist';
        this.message = 'El vehiculo ya existe';
        this.ok = false;
    }
}
exports.VehicleExistException = VehicleExistException;
