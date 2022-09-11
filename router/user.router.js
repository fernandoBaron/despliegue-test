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
const user_controller_1 = require("../controller/user.controller");
const field_not_sent_exception_1 = require("../exceptions/field-not-sent.exception");
const userRouter = (0, express_1.Router)();
userRouter.post('/show', auth_middleware_1.tokenVerify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = req.headers.currentUserTx;
    const userId = parseInt(currentUser.id, 10);
    const userController = new user_controller_1.UserController(currentUser);
    try {
        const user = yield userController.get(userId);
        return res.status(200)
            .json({
            ok: true,
            err: null,
            user,
        });
    }
    catch (e) {
        return res.status(e.code)
            .json(e);
    }
}));
userRouter.post('/setLocation', auth_middleware_1.tokenVerify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = req.headers.currentUserTx;
    const body = req.body;
    const latitude = body.latitude;
    if (!latitude) {
        const exceptionError = new field_not_sent_exception_1.FieldNotSentException('latitude').getError();
        return res.status(exceptionError.code)
            .json(exceptionError);
    }
    const longitude = body.longitude;
    if (!longitude) {
        const exceptionError = new field_not_sent_exception_1.FieldNotSentException('longitude').getError();
        return res.status(exceptionError.code)
            .json(exceptionError);
    }
    const userController = new user_controller_1.UserController(currentUser);
    try {
        const user = yield userController.setLocation(latitude, longitude);
        return res.status(200)
            .json({
            ok: true,
            err: null,
            user,
        });
    }
    catch (e) {
        return res.status(e.code)
            .json(e);
    }
}));
userRouter.post('/uploadFrontDocumentImage', auth_middleware_1.tokenVerify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = req.headers.currentUserTx;
    if (req.files) {
        const documentFrontImage = req.files.fileName;
        if (!documentFrontImage) {
            const exceptionError = new field_not_sent_exception_1.FieldNotSentException('documentFrontImage').getError();
            return res.status(exceptionError.code)
                .json(exceptionError);
        }
        const userController = new user_controller_1.UserController(currentUser);
        try {
            yield userController.uploadDocumentFrontImage(documentFrontImage);
            return res.status(200)
                .json({
                ok: true,
                err: null,
            });
        }
        catch (e) {
            return res.status(e.code)
                .json(e);
        }
    }
}));
userRouter.post('/uploadBackDocumentImage', auth_middleware_1.tokenVerify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = req.headers.currentUserTx;
    if (req.files) {
        const documentBackImage = req.files.fileName;
        if (!documentBackImage) {
            const exceptionError = new field_not_sent_exception_1.FieldNotSentException('documentBackImage').getError();
            return res.status(exceptionError.code)
                .json(exceptionError);
        }
        const userController = new user_controller_1.UserController(currentUser);
        try {
            yield userController.uploadDocumentBackImage(documentBackImage);
            return res.status(200)
                .json({
                ok: true,
                err: null,
            });
        }
        catch (e) {
            return res.status(e.code)
                .json(e);
        }
    }
}));
userRouter.post('/passwordChange', auth_middleware_1.tokenVerify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = req.headers.currentUserTx;
    console.log(req.headers, 'headers');
    console.log(currentUser, 'current');
    const oldPassword = req.body.oldPassword;
    if (!oldPassword) {
        const exceptionError = new field_not_sent_exception_1.FieldNotSentException('oldPassword').getError();
        return res.status(exceptionError.code)
            .json(exceptionError);
    }
    const newPassword = req.body.newPassword;
    if (!newPassword) {
        const exceptionError = new field_not_sent_exception_1.FieldNotSentException('newPassword').getError();
        return res.status(exceptionError.code)
            .json(exceptionError);
    }
    console.log(oldPassword, newPassword);
    const userController = new user_controller_1.UserController(currentUser);
    try {
        yield userController.changePassword(oldPassword, newPassword);
        return res.status(200)
            .json({
            ok: true,
            err: null,
        });
    }
    catch (e) {
        return res.status(e.code)
            .json(e);
    }
}));
exports.default = userRouter;
