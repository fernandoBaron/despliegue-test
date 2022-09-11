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
exports.VehicleClass = void 0;
const Vehicle_not_found_exception_1 = require("../exceptions/Vehicle-not-found.exception");
const vehicle_model_1 = __importDefault(require("../models/vehicle.model"));
const cripto_helper_1 = require("../helper/cripto.helper");
class VehicleClass {
    constructor(currentUserEmail) {
        this.currentUserEmail = currentUserEmail;
    }
    //Finders
    showAllByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehicles = vehicle_model_1.default.findAll({
                where: {
                    userId
                },
                include: [
                    {
                        association: 'UserId'
                    }
                ]
            });
            return vehicles;
        });
    }
    findById(vehicleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehicle = yield vehicle_model_1.default.findOne({
                where: {
                    id: vehicleId
                },
                include: [
                    {
                        association: 'UserId'
                    }
                ]
            });
            if (!vehicle) {
                throw new Vehicle_not_found_exception_1.VehicleNotFoundException().getError();
            }
            this.vehicle = vehicle;
        });
    }
    findByPlate(plate) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehicle = yield vehicle_model_1.default.findOne({
                where: {
                    plate
                }
            });
            if (!vehicle) {
                throw new Vehicle_not_found_exception_1.VehicleNotFoundException().getError();
            }
            this.vehicle = vehicle;
        });
    }
    //Getters
    getVehicle() {
        if (!this.vehicle) {
            throw new Vehicle_not_found_exception_1.VehicleNotFoundException().getError();
        }
        return this.vehicle;
    }
    //Functionality
    addNewVehicle(plate, model, configuration, carBodywork, vehiclePicture, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entra a la clase', plate, model, configuration, carBodywork, vehiclePicture, userId);
            const vehicle = yield vehicle_model_1.default.build({
                plate: plate,
                model: model,
                userId: userId,
                configuration: configuration,
                carBodywork: carBodywork,
                vehiclePicture: yield this.uploadNewFile(vehiclePicture, 'uploads/vehicles/'),
                createdBy: this.currentUserEmail,
                createdAt: new Date(),
            });
            console.log('pasa el build');
            this.vehicle = vehicle;
            console.log('asigna');
            yield this.vehicle.save();
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.vehicle) {
                throw new Vehicle_not_found_exception_1.VehicleNotFoundException().getError();
            }
            this.vehicle.deletedAt = new Date();
            this.vehicle.deletedBy = this.currentUserEmail;
            this.vehicle.save();
            this.vehicle.destroy();
        });
    }
    uploadNewFile(image, folder) {
        const filename = image.name;
        const filenameArray = filename.split(".");
        const cryptoHelper = new cripto_helper_1.CriptoHelper();
        const hashName = cryptoHelper.getHashHex();
        const newName = hashName + '.' + filenameArray[filenameArray.length - 1];
        console.log(newName);
        console.log(`${folder}` + newName);
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            image.mv(`${folder}` + newName, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(newName);
                }
            });
        }));
    }
}
exports.VehicleClass = VehicleClass;
