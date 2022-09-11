"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeConnection = exports.TOKEN_SEED = exports.SERVER_PORT_SSL = exports.SERVER_PORT = void 0;
const sequelize_1 = require("sequelize");
const fs_1 = __importDefault(require("fs"));
const settingsFile = fs_1.default.readFileSync('settings.conf', { encoding: 'utf-8' });
const settings = JSON.parse(settingsFile);
exports.SERVER_PORT = 5300;
exports.SERVER_PORT_SSL = 5301;
exports.TOKEN_SEED = settings.token_seed;
const options = {
    database: settings.database,
    username: settings.username,
    password: settings.password,
    dialect: 'mariadb',
    dialectOptions: { connectTimeout: 1000, useUTC: false, timezone: 'America/Bogota' },
    timezone: 'America/Bogota',
};
exports.sequelizeConnection = new sequelize_1.Sequelize(options);
