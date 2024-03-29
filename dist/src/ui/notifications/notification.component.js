import { __decorate, __metadata } from "tslib";
import { Component, html, Renderer } from '@plumejs/core';
import notificationStyles from './notification.component.scss?inline';
import { NotificationType } from './notification.type';
let NotificationMessage = class NotificationMessage {
    renderer;
    static observedProperties = ['notification'];
    notification;
    constructor(renderer) {
        this.renderer = renderer;
    }
    mount() {
        this.renderer.emitEvent('rendered');
    }
    onDismiss(e) {
        e.preventDefault();
        this.notification.dismiss();
    }
    render() {
        if (this.notification && this.notification.message.content) {
            return html `
        <div
          part="notification"
          class="notification ${this.notification.message.type === NotificationType.Info
                ? 'is-info'
                : this.notification.message.type === NotificationType.Danger
                    ? 'is-danger'
                    : ''}"
        >
          ${this.notification.message.content}
          <button
            class="dismiss ${this.notification.message.autoHide ? 'hide-notify' : ''}"
            onclick=${(e) => {
                this.onDismiss(e);
            }}
          >
            &times;
          </button>
        </div>
      `;
        }
        else {
            return html ``;
        }
    }
};
NotificationMessage = __decorate([
    Component({
        selector: 'ui-notification-message',
        standalone: true,
        styles: notificationStyles,
        deps: [Renderer]
    }),
    __metadata("design:paramtypes", [Renderer])
], NotificationMessage);
export { NotificationMessage };
