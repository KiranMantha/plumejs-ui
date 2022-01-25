"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@plumejs/core");
const message_1 = require("./message");
const notification_type_1 = require("./notification.type");
let NotificationService = class NotificationService {
    sendMessage(content, type = notification_type_1.NotificationType.Info, autoHide = false) {
        const message = new message_1.Message(content, type, autoHide);
        this._addMessage(message);
    }
    _addChild(child, parent = document.body) {
        parent.appendChild(child);
    }
    _removeChild(child, parent = document.body) {
        parent.removeChild(child);
    }
    _addMessage(message) {
        let notificationContainer = document.getElementsByTagName('ui-notification-container')[0];
        if (!notificationContainer) {
            notificationContainer = document.createElement('ui-notification-container');
            this._addChild(notificationContainer);
        }
        if (!this._containerModel) {
            const notificationContainerRef = notificationContainer;
            this._containerModel = notificationContainerRef.getInstance();
            this._containerModel.onDismiss.subscribe((count) => {
                if (count === 0) {
                    this._removeChild(notificationContainer);
                    this._containerModel = null;
                }
            });
        }
        this._containerModel.setNotifications(message);
    }
};
NotificationService = (0, tslib_1.__decorate)([
    (0, core_1.Injectable)()
], NotificationService);
exports.NotificationService = NotificationService;
