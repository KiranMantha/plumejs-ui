import { Component, html } from "@plumejs/core";
import { Subject } from "rxjs";
import notificationStyles from './notification.component.scss';
export class NotificationContainerComponent {
    constructor() {
        this._notifications = [];
        this.onDismiss = new Subject();
        this.dismiss = this.dismiss.bind(this);
    }
    setNotifications(message) {
        this._notifications.push(message);
        message.index = this._notifications.length - 1;
        this.renderer.update();
    }
    dismiss(index) {
        this._notifications = this._notifications.filter(m => { if (m.index !== index)
            return m; });
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
            let list = this._notifications.map((msg, i) => {
                let notify = {
                    message: msg,
                    dismiss: this.dismiss
                };
                return html `
						<notification-message
							onrendered=${(e) => { this._renderNotification(e.target, notify); }}
						></notification-message>
					`;
            });
            return list;
        }
        else {
            return html `<div></div>`;
        }
    }
    unmount() {
        this.onDismiss.complete();
    }
    render() {
        return html `
			<div class="notifications_wrapper">
				${this._renderNotifications()}
			</div>
		`;
    }
}
Component({
	selector: "notification-container",
	styles: notificationStyles
})([NotificationContainerComponent]);
export class NotificationMessage {
    mount() {
        this.renderer.emitEvent('rendered');
    }
    onDismiss(e) {
        e.preventDefault();
        this.notification.dismiss(this.notification.message.index);
    }
    render() {
        if (this.notification && this.notification.message.content) {
            return html `
					<div
						class="notification ${this.notification.message.type === "info"
                ? "is-info"
                : this.notification.message.type === "danger"
                    ? "is-danger"
                    : ""}">
						${this.notification.message.content}
						<button
							class="dismiss ${this.notification.message.autoHide ? 'hide-notify' : ''}"
							onclick=${(e) => { this.onDismiss(e); }}
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
}
Component({
	selector: "notification-message",
	useShadow: false
})([NotificationMessage]);
