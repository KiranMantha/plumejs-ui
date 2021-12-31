"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationMessage = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@plumejs/core");
const notification_component_scss_1 = (0, tslib_1.__importDefault)(require("./notification.component.scss"));
let NotificationMessage = class NotificationMessage {
    constructor(renderer) {
        this.renderer = renderer;
        this.ObservedProperties = ['notification'];
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
            return (0, core_1.html) `
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
            return (0, core_1.html) `<div></div>`;
        }
    }
};
NotificationMessage = (0, tslib_1.__decorate)([
    (0, core_1.Component)({
        selector: 'ui-notification-message',
        styles: notification_component_scss_1.default
    }),
    (0, tslib_1.__metadata)("design:paramtypes", [core_1.Renderer])
], NotificationMessage);
exports.NotificationMessage = NotificationMessage;
