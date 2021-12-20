import { __decorate } from "tslib";
import { Injectable } from '@plumejs/core';
import { Message } from './message';
import { NotificationType } from './notification.type';
let NotificationService = class NotificationService {
    _containerModel;
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
    sendMessage(content, type = NotificationType.Info, autoHide = false) {
        const message = new Message(content, type, autoHide);
        this._addMessage(message);
    }
};
NotificationService = __decorate([
    Injectable()
], NotificationService);
export { NotificationService };
