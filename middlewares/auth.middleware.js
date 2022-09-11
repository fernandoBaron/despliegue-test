"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenVerify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = require("../global/environment");
const user_model_1 = __importDefault(require("../models/user.model"));
function tokenVerify(req, res, next) {
    const token = req.headers.token;
    jsonwebtoken_1.default.verify(token, environment_1.TOKEN_SEED, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
        if (err) {
            res.status(401)
                .json({
                ok: false,
                err: 'invalid token',
                details: err,
            });
        }
        else {
            console.log('entra');
            const email = decoded.userDB.email;
            const user = yield user_model_1.default.findOne({ where: { 'email': email } });
            if (user !== null) {
                // @ts-ignore
                req.headers.currentUserTx = user;
                next();
            }
            else {
                res.status(401)
                    .json({
                    ok: false,
                    err: 'invalid token',
                    details: err,
                });
            }
        }
    }));
}
exports.tokenVerify = tokenVerify;
