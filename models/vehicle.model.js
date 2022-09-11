"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const environment_1 = require("../global/environment");
const user_model_1 = __importDefault(require("./user.model"));
class Vehicle extends sequelize_1.Model {
}
exports.default = Vehicle;
Vehicle.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: user_model_1.default,
            key: 'id'
        }
    },
    plate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    model: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    configuration: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    carBodywork: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    vehiclePicture: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    createdBy: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    updatedBy: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    deletedBy: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'vehicles',
    paranoid: true,
    timestamps: true,
    sequelize: environment_1.sequelizeConnection,
});
Vehicle.belongsTo(user_model_1.default, {
    foreignKey: 'userId',
    as: 'UserId'
});
