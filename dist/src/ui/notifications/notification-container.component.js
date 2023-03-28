import { __decorate } from "tslib";
import { Component, html } from '@plumejs/core';
import { Subject } from 'rxjs';
import notificationContainerStyles from './notification-container.component.scss?inline';
let NotificationContainerComponent = class NotificationContainerComponent {
    _notifications = [];
    onDismiss = new Subject();
    setNotifications(message) {
        this._notifications = [...this._notifications, message];
        message.index = this._notifications.length - 1;
    }
    dismiss(index) {
        this._notifications = this._notifications.filter((m) => {
            if (m.index !== index)
                return m;
        });
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
        styles: notificationContainerStyles,
        standalone: true
    })
], NotificationContainerComponent);
export { NotificationContainerComponent };
