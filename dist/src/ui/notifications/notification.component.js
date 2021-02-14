import { __decorate, __metadata } from "tslib";
import { Component, html, Input } from "@plumejs/core";
import { Subject } from "rxjs";
import { Message } from "./message";
import notificationStyles from './notification.component.scss';
const registerNotificationsComponent = () => {
    let NotificationContainerComponent = class NotificationContainerComponent {
        constructor() {
            this._notifications = [];
            this.onDismiss = new Subject();
            this.dismiss = this.dismiss.bind(this);
        }
        setNotifications(message) {
            this._notifications.push(message);
            message.index = this._notifications.length - 1;
            this.update();
        }
        dismiss(index) {
            this._notifications = this._notifications.filter(m => { if (m.index !== index)
                return m; });
            this.update();
            this.onDismiss.next(this._notifications.length);
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
							notification=${notify}
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
    };
    NotificationContainerComponent = __decorate([
        Component({
            selector: "notification-container",
            styles: notificationStyles
        }),
        __metadata("design:paramtypes", [])
    ], NotificationContainerComponent);
    let NotificationMessage = class NotificationMessage {
        constructor() {
            this.notification = {
                message: new Message(""),
                dismiss: () => { }
            };
        }
        inputChanged(oldval, newval) {
            if (newval.message.autoHide) {
                setTimeout(() => {
                    this.notification.dismiss(this.notification.message.index);
                }, 2000);
            }
        }
        onDismiss(e) {
            e.preventDefault();
            this.notification.dismiss(this.notification.message.index);
        }
        render() {
            if (this.notification.message.content) {
                return html `
					<div
						class=${`notification ${this.notification.message.type === "info"
                    ? "is-info"
                    : this.notification.message.type === "danger"
                        ? "is-danger"
                        : ""}`}
					>
						${this.notification.message.content}
						<button
							class="dismiss ${this.notification.message.autoHide ? 'hide-notify' : ''}"
							onclick=${(e) => {
                    this.onDismiss(e);
                }}
						>&times;</button>						
					</div>
				`;
            }
            else {
                return html `<div></div>`;
            }
        }
    };
    __decorate([
        Input,
        __metadata("design:type", Object)
    ], NotificationMessage.prototype, "notification", void 0);
    NotificationMessage = __decorate([
        Component({
            selector: "notification-message",
            useShadow: false
        })
    ], NotificationMessage);
};
export default registerNotificationsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9ub3RpZmljYXRpb25zL25vdGlmaWNhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxrQkFBa0IsTUFBTSwrQkFBK0IsQ0FBQztBQU8vRCxNQUFNLDhCQUE4QixHQUFHLEdBQUcsRUFBRTtJQUszQyxJQUFNLDhCQUE4QixHQUFwQyxNQUFNLDhCQUE4QjtRQUtuQztZQUpRLG1CQUFjLEdBQW1CLEVBQUUsQ0FBQztZQUU1QyxjQUFTLEdBQW9CLElBQUksT0FBTyxFQUFFLENBQUM7WUFHMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBRUQsZ0JBQWdCLENBQUMsT0FBZ0I7WUFDaEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUVPLE9BQU8sQ0FBQyxLQUFhO1lBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssS0FBSztnQkFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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