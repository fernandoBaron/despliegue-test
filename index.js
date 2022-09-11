"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server/server"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_router_1 = __importDefault(require("./router/user.router"));
const security_router_1 = __importDefault(require("./router/security.router"));
const environment_1 = require("./global/environment");
const vehicle_router_1 = __importDefault(require("./router/vehicle.router"));
const server = server_1.default.instance;
// BodyParser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// CORS
environment_1.sequelizeConnection.sync();
//Services Routing
server.app.use('/app/users/', user_router_1.default);
server.app.use('/app/vehicles/', vehicle_router_1.default);
server.app.use('/', security_router_1.default);
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
