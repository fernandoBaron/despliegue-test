"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleNotFoundException = void 0;
const abstract_exception_1 = require("./abstract-exception");
class VehicleNotFoundException extends abstract_exception_1.AbstractException {
    constructor() {
        super();
        this.setValues();
    }
    setValues() {
        this.code = 400;
        this.err = 'Vehicle not found';
        this.message = 'Vehiculo no encontrado';
        this.ok = false;
    }
}
exports.VehicleNotFoundException = VehicleNotFoundException;
