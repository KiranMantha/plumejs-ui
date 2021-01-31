"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@plumejs/core");
const message_1 = require("./message");
const rxjs_1 = require("rxjs");
const notification_component_scss_1 = tslib_1.__importDefault(require("./notification.component.scss"));
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
                    return core_1.html `
						<notification-message
							notification=${notify}
						></notification-message>
					`;
                });
                return list;
            }
            else {
                return core_1.html `<div></div>`;
            }
        }
        unmount() {
            this.onDismiss.complete();
        }
        render() {
            return core_1.html `
				<div class="notifications_wrapper">
					${this._renderNotifications()}
				</div>
			`;
        }
    };
    NotificationContainerComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "notification-container",
            styles: notification_component_scss_1.default
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
                return core_1.html `
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
                return core_1.html `<div></div>`;
            }
        }
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], NotificationMessage.prototype, "notification", void 0);
    NotificationMessage = tslib_1.__decorate([
        core_1.Component({
            selector: "notification-message",
            useShadow: false
        })
    ], NotificationMessage);
};
exports.default = registerNotificationsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9ub3RpZmljYXRpb25zL25vdGlmaWNhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0NBQStEO0FBQy9ELHVDQUFvQztBQUNwQywrQkFBK0I7QUFDL0Isd0dBQStEO0FBTy9ELE1BQU0sOEJBQThCLEdBQUcsR0FBRyxFQUFFO0lBSzNDLElBQU0sOEJBQThCLEdBQXBDLE1BQU0sOEJBQThCO1FBS25DO1lBSlEsbUJBQWMsR0FBa0IsRUFBRSxDQUFDO1lBRTNDLGNBQVMsR0FBb0IsSUFBSSxjQUFPLEVBQUUsQ0FBQztZQUcxQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFFRCxnQkFBZ0IsQ0FBQyxPQUFlO1lBQy9CLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUUsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLENBQUM7UUFFTyxPQUFPLENBQUMsS0FBYTtZQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBRyxDQUFDLENBQUMsS0FBSyxLQUFLLEtBQUs7Z0JBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFFRCxv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