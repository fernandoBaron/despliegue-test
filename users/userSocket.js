"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSocket = void 0;
class UserSocket {
    constructor(id) {
        this.user = null;
        this.id = id;
        this.email = 'pending-email';
        this.room = 'no-room';
    }
    getId() {
        return this.id;
    }
    getUser() {
        return this.user;
    }
    setUser(user) {
        this.user = user;
    }
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }
}
exports.UserSocket = UserSocket;
