"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const notification_type_1 = require("./notification.type");
class Message {
    constructor(content, type = notification_type_1.NotificationType.Info, autoHide = false) {
        this.autoHide = false;
        this.content = content;
        this.type = type;
        this.autoHide = autoHide;
    }
}
exports.Message = Message;
