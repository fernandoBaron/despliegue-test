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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const security_controller_1 = require("../controller/security.controller");
const field_not_sent_exception_1 = require("../exceptions/field-not-sent.exception");
const securityRouter = (0, express_1.Router)();
securityRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const firstname = body.firstname;
    if (!firstname) {
        const exceptionError = new field_not_sent_exception_1.FieldNotSentException('firstname').getError();
        return res.status(exceptionError.code)
            .json(exceptionError);
    }
    const lastname = body.lastname;
    if (!lastname) {
        const exceptionError = new field_not_sent_exception_1.FieldNotSentException('lastname').getError();
        return res.status(exceptionError.code)
            .json(exceptionError);
    }
    const identification = body.identification;
    if (!identification) {
        const exceptionError = new field_not_sent_exception_1.FieldNotSentException('identification').getError();
        return res.status(exceptionError.code)
            .json(exceptionError);
    }
    const identificationType = body.identificationType;
    if (!identificationType) {
        const exceptionError = new field_not_sent_exception_1.FieldNotSentException('identificationType').getError();
        return res.status(exceptionError.code)
            .json(exceptionError);
    }
    const email = body.email;
    if (!email) {
        const exceptionError = new field_not_sent_exception_1.FieldNotSentException('email').getError();
        return res.status(exceptionError.code)
            .json(exceptionError);
    }
    const phone = body.phone;
    if (!phone) {
        const exceptionError = new field_not_sent_exception_1.FieldNotSentException('phone').getError();
        return res.status(exceptionError.code)
            .json(exceptionError);
    }
    const securityController = new security_controller_1.SecurityController();
    try {
        yield securityController.signUp(firstname, lastname, identification, identificationType, email, phone);
        return res.status(200)
            .json({
            ok: true,
            err: null,
            message: 'User created successfully',
        });
    }
    catch (e) {
        return res.status(e.code | 400)
            .json(e);
    }
}));
securityRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('entra');
    const email = req.body.email;
    if (!email) {
        const exceptionError = new field_not_sent_exception_1.FieldNotSentException('email').getError();
        return res.status(exceptionError.code)
            .json(exceptionError);
    }
    const password = req.body.password;
    if (!password) {
        const exceptionError = new field_not_sent_exception_1.FieldNotSentException('password').getError();
        return res.status(exceptionError.code)
            .json(exceptionError);
    }
    const securityController = new security_controller_1.SecurityController();
    try {
        const response = yield securityController.login(email, password);
        return res.status(200)
            .json({
            ok: true,
            err: null,
            token: response.token,
            user: response.user,
        });
    }
    catch (e) {
        return res.status(e.code)
            .json({
            ok: false,
            err: 'Invalid credentials',
            message: 'Credenciales inválidas'
        });
    }
}));
securityRouter.post('/checkToken', auth_middleware_1.tokenVerify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('validaToken');
    return res.status(200)
        .json({
        ok: true,
        err: 'Valid token',
        message: 'Token válido',
    });
}));
exports.default = securityRouter;
