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
exports.listenClient = exports.closeConnection = exports.newConnection = exports.connectedSocketUsers = void 0;
const user_sockets_administrator_1 = require("../users/user-sockets-administrator");
const userSocket_1 = require("../users/userSocket");
const user_model_1 = __importDefault(require("../models/user.model"));
exports.connectedSocketUsers = user_sockets_administrator_1.UserSocketsAdministrator.instance;
const newConnection = (client, io) => {
    const user = new userSocket_1.UserSocket(client.id);
    exports.connectedSocketUsers.newConnection(user);
};
exports.newConnection = newConnection;
const closeConnection = (client, io) => {
    client.on('disconnect', () => {
        exports.connectedSocketUsers.deleteUser(client.id);
    });
};
exports.closeConnection = closeConnection;
const configUser = (client, io) => {
    client.on('config-user', (payload, callback) => __awaiter(void 0, void 0, void 0, function* () {
        if (payload.email !== null) {
            const user = yield user_model_1.default.findOne({ where: { 'email': payload.email } });
            if (!user) {
                return;
            }
            // @ts-ignore
            exports.connectedSocketUsers.updateUser(client.id, payload.email, user.dataValues);
        }
        callback({
            ok: true,
            mensaje: `Usuario ${payload.email}, configurado`
        });
    }));
};
const listenClient = (client, io) => {
    // @ts-ignore
    const onEvent = client.onevent;
    // @ts-ignore
    client.onevent = function (packet) {
        console.log('??????????????? socket.ts client.onevent ?????????????????????????????');
        const args = packet.data || [];
        onEvent.call(this, packet);
        const topicEventName = packet.data[0];
        console.log('packet', packet);
        console.log('topicEventName', topicEventName);
        switch (topicEventName) {
            case 'config-user':
                configUser(client, io);
                break;
            default:
                const payload = packet.data[1];
                console.log("\x1b[43m SOCKET topicEventName \x1b[49m\x1b[0m");
                console.log(topicEventName);
        }
    };
};
exports.listenClient = listenClient;
