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
const field_not_sent_exception_1 = require("../exceptions/field-not-sent.exception");
const vehicle_controller_1 = require("../controller/vehicle.controller");
const vehicleRouter = (0, express_1.Router)();
vehicleRouter.get('/', auth_middleware_1.tokenVerify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = req.headers.currentUserTx;
    const vehicleController = new vehicle_controller_1.VehicleController(currentUser);
    try {
        const vehicles = yield vehicleController.showAll();
        return res.status(200)
            .json({
            ok: true,
            err: null,
            vehicles,
        });
    }
    catch (e) {
        return res.status(400)
            .json(e);
    }
}));
vehicleRouter.post('/add', auth_middleware_1.tokenVerify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = req.headers.currentUserTx;
    const body = JSON.parse(req.body.vehicle);
    const plate = body.plate;
    if (!plate) {
        const exceptionError = new field_not_sent_exception_1.FieldNotSentException('plate').getError();
        return res.status(exceptionError.code)
            .json(exceptionError);
    }
    console.log(plate, 'PLACA');
    const model = body.model;
    if (!model) {
        const exceptionError = new field_not_sent_exception_1.FieldNotSentException('model').getError();
        return res.status(exceptionError.code)
            .json(exceptionError);
    }
    console.log(model, 'MODEL');
    const configuration = body.configuration;
    if (!configuration) {
        const exceptionError = new field_not_sent_exception_1.FieldNotSentException('configuration').getError();
        return res.status(exceptionError.code)
            .json(exceptionError);
    }
    console.log(configuration, 'CONF');
    const carBodywork = body.carBodywork;
    if (!carBodywork) {
        const exceptionError = new field_not_sent_exception_1.FieldNotSentException('carBodywork').getError();
        return res.status(exceptionError.code)
            .json(exceptionError);
    }
    console.log(carBodywork, 'CAR');
    if (req.files) {
        const vehiclePicture = req.files.fileName;
        if (!vehiclePicture) {
            const exceptionError = new field_not_sent_exception_1.FieldNotSentException('vehiclePicture').getError();
            return res.status(exceptionError.code)
                .json(exceptionError);
        }
        const vehicleController = new vehicle_controller_1.VehicleController(currentUser);
        try {
            const vehicle = yield vehicleController.add(plate, model, configuration, carBodywork, vehiclePicture);
            return res.status(200)
                .json({
                ok: true,
                err: null,
                message: 'Vehicle created successfully',
                vehicle
            });
        }
        catch (e) {
            return res.status(e.code)
                .json(e);
        }
    }
}));
vehicleRouter.post('/:vehicleId/show', auth_middleware_1.tokenVerify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = req.headers.currentUserTx;
    const vehicleId = parseInt(req.params.vehicleId, 10);
    if (!vehicleId) {
        const exceptionError = new field_not_sent_exception_1.FieldNotSentException('vehicleId').getError();
        return res.status(exceptionError.code)
            .json(exceptionError);
    }
    const vehicleController = new vehicle_controller_1.VehicleController(currentUser);
    try {
        const vehicle = yield vehicleController.show(vehicleId);
        return res.status(200)
            .json({
            ok: true,
            err: 'Ok',
            vehicle,
        });
    }
    catch (e) {
        return res.status(400)
            .json(e);
    }
}));
vehicleRouter.post('/:vehicleId/delete', auth_middleware_1.tokenVerify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = req.headers.currentUserTx;
    const vehicleId = parseInt(req.params.vehicleId, 10);
    const vehicleController = new vehicle_controller_1.VehicleController(currentUser);
    try {
        yield vehicleController.delete(vehicleId);
        return res.status(200)
            .json({
            ok: true,
            err: 'ok'
        });
    }
    catch (e) {
        return res.status(e.code)
            .json(e);
    }
}));
exports.default = vehicleRouter;
