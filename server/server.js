"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const environment_1 = require("../global/environment");
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        let options = {
            key: new Buffer(''),
            cert: new Buffer(''),
        };
        try {
            options.key = fs_1.default.readFileSync("/etc/letsencrypt/archive/www.qbit.ryd.com.co-0001/privkey9.pem");
            options.cert = fs_1.default.readFileSync("/etc/letsencrypt/archive/www.qbit.ryd.com.co-0001/fullchain9.pem");
        }
        catch (e) {
        }
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)({
            origin: '*',
            credentials: false,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            preflightContinue: true,
        }));
        this.app.use((0, express_fileupload_1.default)());
        this.app.use('/profiles', express_1.default.static('uploads/profiles'));
        this.app.use('/vehicles', express_1.default.static('uploads/vehicles'));
        this.app.use('/documents', express_1.default.static('uploads/documents'));
        this.port = environment_1.SERVER_PORT;
        this.portSSL = environment_1.SERVER_PORT_SSL;
        this.httpServer = new http_1.default.Server(this.app);
        console.log('http server running on port ' + this.port);
        try {
            this.httpsServer = https_1.default.createServer(options, this.app);
            console.log('https server running on port ' + this.port);
            this.io = (0, socket_io_1.default)(this.httpsServer);
        }
        catch (e) {
            this.io = (0, socket_io_1.default)(this.httpServer);
        }
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    start(callback) {
        this.httpServer.listen(this.port);
        try {
            this.httpsServer.listen(this.portSSL);
        }
        catch (e) {
        }
    }
}
exports.default = Server;
