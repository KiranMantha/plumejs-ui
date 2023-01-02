import { __decorate, __metadata } from "tslib";
import { Component, html, Renderer } from '@plumejs/core';
import { Subject } from 'rxjs';
import notificationContainerStyles from './notification-container.component.scss';
let NotificationContainerComponent = class NotificationContainerComponent {
    renderer;
    _notifications = [];
    onDismiss = new Subject();
    constructor(renderer) {
        this.renderer = renderer;
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
                return html `
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
            return html `<div></div>`;
        }
    }
    unmount() {
        this.onDismiss.unsubscribe();
    }
    render() {
        return html ` <div class="notifications_wrapper" part="notifications_wrapper">${this._renderNotifications()}</div> `;
    }
};
NotificationContainerComponent = __decorate([
    Component({
        selector: 'ui-notification-container',
        standalone: true,
        styles: notificationContainerStyles,
        deps: [Renderer]
    }),
    __metadata("design:paramtypes", [Renderer])
], NotificationContainerComponent);
export { NotificationContainerComponent };
