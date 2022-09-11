"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSocketsAdministrator = void 0;
class UserSocketsAdministrator {
    constructor() {
        this.list = [];
    }
    newConnection(user) {
        console.log('===== Conectando Usuario ====');
        this.list.push(user);
        return user;
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    updateUser(id, email, user) {
        for (let userSocket of this.list) {
            if (userSocket.getId() === id) {
                userSocket.setEmail(email);
                userSocket.setUser(user);
                console.log('===== Actualizando usuario ====');
                break;
            }
        }
    }
    getList() {
        return this.list.filter(user => user.getEmail() !== 'pending-email');
    }
    getUserSocket(id) {
        return this.list.find(socket => socket.getId() === id);
    }
    deleteUser(id) {
        const tempUser = this.getUserSocket(id);
        this.list = this.list.filter(user => {
            if (user.getId() === id) {
                const userObj = user.getUser();
                if (userObj) {
                }
                console.log('===== Desconectando usuario ====');
            }
            return user.getId() !== id;
        });
        return tempUser;
    }
}
exports.UserSocketsAdministrator = UserSocketsAdministrator;
