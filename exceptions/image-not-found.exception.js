"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageNotFoundException = void 0;
const abstract_exception_1 = require("./abstract-exception");
class ImageNotFoundException extends abstract_exception_1.AbstractException {
    constructor() {
        super();
        this.setValues();
    }
    setValues() {
        this.code = 400;
        this.err = 'Image not found';
        this.message = 'Imagen no encontrada';
        this.ok = false;
    }
}
exports.ImageNotFoundException = ImageNotFoundException;
