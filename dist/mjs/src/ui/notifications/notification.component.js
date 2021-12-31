import { __decorate, __metadata } from "tslib";
import { Component, html, Renderer } from '@plumejs/core';
import notificationStyles from './notification.component.scss';
let NotificationMessage = class NotificationMessage {
    renderer;
    ObservedProperties = ['notification'];
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
          class="notification ${this.notification.message.type === 'info'
                ? 'is-info'
                : this.notification.message.type === 'danger'
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
            return html `<div></div>`;
        }
    }
};
NotificationMessage = __decorate([
    Component({
        selector: 'ui-notification-message',
        styles: notificationStyles
    }),
    __metadata("design:paramtypes", [Renderer])
], NotificationMessage);
export { NotificationMessage };
