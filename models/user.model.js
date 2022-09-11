"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const environment_1 = require("../global/environment");
class User extends sequelize_1.Model {
}
exports.default = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    identification: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    identificationType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    documentFrontImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    documentBackImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    latitude: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    longitude: {
        type: sequelize_1.DataTypes.FLOAT,
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
    tableName: 'users',
    paranoid: true,
    timestamps: true,
    sequelize: environment_1.sequelizeConnection,
});
