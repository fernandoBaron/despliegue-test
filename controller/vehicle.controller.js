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
exports.VehicleController = void 0;
const vehicle_class_1 = require("../clases/vehicle.class");
const vehicle_exist_exception_1 = require("../exceptions/vehicle-exist.exception");
class VehicleController {
    constructor(currentUser) {
        this.currentUser = currentUser;
    }
    showAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const vehicleClass = new vehicle_class_1.VehicleClass(this.currentUser.email);
            const userId = this.currentUser.id;
            return yield vehicleClass.showAllByUserId(userId);
        });
    }
    add(plate, model, configuration, carBodywork, vehiclePicture) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehicleClass = new vehicle_class_1.VehicleClass(this.currentUser.email);
            const userId = this.currentUser.id;
            console.log('entra al controller', userId);
            try {
                yield vehicleClass.findByPlate(plate);
            }
            catch (e) {
                yield vehicleClass.addNewVehicle(plate, model, configuration, carBodywork, vehiclePicture, userId);
                return vehicleClass.getVehicle();
            }
            throw new vehicle_exist_exception_1.VehicleExistException().getError();
        });
    }
    show(vehicleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehicleClass = new vehicle_class_1.VehicleClass(this.currentUser.email);
            yield vehicleClass.findById(vehicleId);
            return vehicleClass.getVehicle();
        });
    }
    delete(vehicleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehicleClass = new vehicle_class_1.VehicleClass(this.currentUser.email);
            yield vehicleClass.findById(vehicleId);
            yield vehicleClass.delete();
        });
    }
}
exports.VehicleController = VehicleController;
