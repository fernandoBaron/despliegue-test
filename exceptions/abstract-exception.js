"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractException = void 0;
class AbstractException {
    getError() {
        return {
            code: this.code,
            ok: this.ok,
            err: this.err,
            message: this.message,
        };
    }
}
exports.AbstractException = AbstractException;
