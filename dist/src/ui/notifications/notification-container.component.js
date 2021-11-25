"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationContainerComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@plumejs/core");
const rxjs_1 = require("rxjs");
const notification_container_component_scss_1 = (0, tslib_1.__importDefault)(require("./notification-container.component.scss"));
let NotificationContainerComponent = class NotificationContainerComponent {
    renderer;
    _notifications = [];
    onDismiss = new rxjs_1.Subject();
    constructor(renderer) {
        this.renderer = renderer;
        this.dismiss = this.dismiss.bind(this);
    }
    setNotifications(message) {
        this._notifications.push(message);
        message.index = this._notifications.length - 1;
        this.renderer.update();
    }
    dismiss(index) {
        this._notifications = this._notifications.filter((m) => {
            if (m.index !== index)
                return m;
        });
        this.renderer.update();
        this.onDismiss.next(this._notifications.length);
    }
    _renderNotification(target, notification) {
        target.setProps({ notification });
        if (notification.message.autoHide) {
            setTimeout(() => {
                notification.dismiss(notification.message.index);
            }, 2000);
        }
    }
    _renderNotifications() {
        if (this._notifications.length > 0) {
            const list = this._notifications.map((msg) => {
                const notify = {
                    message: msg,
                    dismiss: this.dismiss
                };
                return (0, core_1.html) `
          <notification-message
            onrendered=${(e) => {
                    this._renderNotification(e.target, notify);
                }}
          ></notification-message>
        `;
            });
            return list;
        }
        else {
            return (0, core_1.html) `<div></div>`;
        }
    }
    unmount() {
        this.onDismiss.complete();
    }
    render() {
        return (0, core_1.html) ` <div class="notifications_wrapper">${this._renderNotifications()}</div> `;
    }
};
NotificationContainerComponent = (0, tslib_1.__decorate)([
    (0, core_1.Component)({
        selector: 'notification-container',
        styles: notification_container_component_scss_1.default
    }),
    (0, tslib_1.__metadata)("design:paramtypes", [core_1.Renderer])
], NotificationContainerComponent);
exports.NotificationContainerComponent = NotificationContainerComponent;
