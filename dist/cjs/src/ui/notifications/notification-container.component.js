"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationContainerComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@plumejs/core");
const rxjs_1 = require("rxjs");
const notification_container_component_scss_1 = tslib_1.__importDefault(require("./notification-container.component.scss"));
let NotificationContainerComponent = class NotificationContainerComponent {
    constructor(renderer) {
        this.renderer = renderer;
        this._notifications = [];
        this.onDismiss = new rxjs_1.Subject();
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
                notification.dismiss();
            }, 2000);
        }
    }
    _renderNotifications() {
        if (this._notifications.length > 0) {
            const list = this._notifications.map((msg) => {
                const notify = {
                    message: msg,
                    dismiss: () => {
                        this.dismiss(msg.index);
                    }
                };
                return (0, core_1.html) `
          <ui-notification-message
            onrendered=${(e) => {
                    this._renderNotification(e.target, notify);
                }}
          ></ui-notification-message>
        `;
            });
            return list;
        }
        else {
            return (0, core_1.html) `<div></div>`;
        }
    }
    unmount() {
        this.onDismiss.unsubscribe();
    }
    render() {
        return (0, core_1.html) ` <div class="notifications_wrapper" part="notifications_wrapper">${this._renderNotifications()}</div> `;
    }
};
NotificationContainerComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'ui-notification-container',
        standalone: true,
        styles: notification_container_component_scss_1.default,
        deps: [core_1.Renderer]
    }),
    tslib_1.__metadata("design:paramtypes", [core_1.Renderer])
], NotificationContainerComponent);
exports.NotificationContainerComponent = NotificationContainerComponent;
