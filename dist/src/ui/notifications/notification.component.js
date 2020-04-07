"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const plumejs_1 = require("plumejs");
const message_1 = require("./message");
const rxjs_1 = require("rxjs");
const registerNotificationsComponent = () => {
    let NotificationContainerComponent = class NotificationContainerComponent {
        constructor() {
            this._notifications = [];
            this.onDismiss = new rxjs_1.Subject();
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
                    return plumejs_1.html `
						<notification-message
							notification=${notify}
						></notification-message>
					`;
                });
                return list;
            }
            else {
                return plumejs_1.html `<div></div>`;
            }
        }
        unmount() {
            this.onDismiss.complete();
        }
        render() {
            return plumejs_1.html `
				<div class="notifications_wrapper">
					${this._renderNotifications()}
				</div>
			`;
        }
    };
    NotificationContainerComponent = tslib_1.__decorate([
        plumejs_1.Component({
            selector: "notification-container",
            styleUrl: "notification.component.scss"
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], NotificationContainerComponent);
    let NotificationMessage = class NotificationMessage {
        constructor() {
            this.notification = {
                message: new message_1.Message(""),
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
                return plumejs_1.html `
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
                return plumejs_1.html `<div></div>`;
            }
        }
    };
    tslib_1.__decorate([
        plumejs_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], NotificationMessage.prototype, "notification", void 0);
    NotificationMessage = tslib_1.__decorate([
        plumejs_1.Component({
            selector: "notification-message",
            useShadow: false
        })
    ], NotificationMessage);
};
exports.default = registerNotificationsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9ub3RpZmljYXRpb25zL25vdGlmaWNhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXlEO0FBQ3pELHVDQUFvQztBQUNwQywrQkFBK0I7QUFPL0IsTUFBTSw4QkFBOEIsR0FBRyxHQUFHLEVBQUU7SUFLM0MsSUFBTSw4QkFBOEIsR0FBcEMsTUFBTSw4QkFBOEI7UUFLbkM7WUFKUSxtQkFBYyxHQUFrQixFQUFFLENBQUM7WUFFM0MsY0FBUyxHQUFvQixJQUFJLGNBQU8sRUFBRSxDQUFDO1lBRzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVELGdCQUFnQixDQUFDLE9BQWU7WUFDL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRSxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUVPLE9BQU8sQ0FBQyxLQUFhO1lBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFHLENBQUMsQ0FBQyxLQUFLLEtBQUssS0FBSztnQkFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNGLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUVELG9CQUFvQjtZQUNuQixJ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