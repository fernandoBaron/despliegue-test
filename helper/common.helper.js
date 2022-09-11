"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonHelper = void 0;
class CommonHelper {
    generateNumberBetween(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
exports.CommonHelper = CommonHelper;
;
