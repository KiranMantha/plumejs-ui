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
        }
        setNotifications(message) {
            this._notifications.push(message);
            this.update();
        }
        dismiss(index) {
            this._notifications.splice(index, 1);
            this.update();
            this.onDismiss.next(this._notifications.length);
        }
        render() {
            return plumejs_1.html `
				<div class="notifications_wrapper">
					${this._notifications.map((msg, i) => {
                let notify = {
                    message: msg,
                    index: i,
                    dismiss: this.dismiss.bind(this)
                };
                return plumejs_1.html `
							<notification-message
								notification=${notify}
							></notification-message>
						`;
            })}
				</div>
			`;
        }
    };
    NotificationContainerComponent = tslib_1.__decorate([
        plumejs_1.Component({
            selector: "notification-container",
            styleUrl: "notification.component.scss"
        })
    ], NotificationContainerComponent);
    let NotificationMessage = class NotificationMessage {
        constructor() {
            this.notification = {
                message: new message_1.Message(""),
                index: 0,
                dismiss: () => { }
            };
        }
        onDismiss(e) {
            e.preventDefault();
            this.notification.dismiss(this.notification.index);
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
							class="dismiss"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9ub3RpZmljYXRpb25zL25vdGlmaWNhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQWlEO0FBQ2pELHVDQUFvQztBQUNwQywrQkFBK0I7QUFRL0IsTUFBTSw4QkFBOEIsR0FBRyxHQUFHLEVBQUU7SUFLM0MsSUFBTSw4QkFBOEIsR0FBcEMsTUFBTSw4QkFBOEI7UUFBcEM7WUFDUyxtQkFBYyxHQUFrQixFQUFFLENBQUM7WUFHM0MsY0FBUyxHQUFvQixJQUFJLGNBQU8sRUFBRSxDQUFDO1FBK0I1QyxDQUFDO1FBN0JBLGdCQUFnQixDQUFDLE9BQWU7WUFDL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUVPLE9BQU8sQ0FBQyxLQUFhO1lBQzVCLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFFRCxNQUFNO1lBQ0wsT0FBTyxjQUFJLENBQUE7O09BRU4sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzlDLElBQUksTUFBTSxHQUFrQjtvQkFDM0IsT0FBTyxFQUFFLEdBQUc7b0JBQ1osS0FBSyxFQUFFLENBQUM7b0JBQ1IsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztpQkFDaEMsQ0FBQztnQkFDRixPQUFPLGNBQUksQ0FBQTs7dUJBRU0sTUFBTTs7T0FFdEIsQ0FBQztZQUNILENBQUMsQ0FBRTs7SUFFSixDQUFDO1FBQ0gsQ0FBQztLQUNELENBQUE7SUFuQ0ssOEJBQThCO1FBSm5DLG1CQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLFFBQVEsRUFBRSw2QkFBNkI7U0FDdkMsQ0FBQztPQUNJLDhCQUE4QixDQW1DbkM7SUFNRCxJQUFNLG1CQUFtQixHQUF6QixNQUFNLG1CQUFtQjtRQUF6QjtZQUVDLGlCQUFZLEdBQWtCO2dCQUM3QixPQUFPLEVBQUUsSUFBSSxpQkFBTyxDQUFDLEVBQUUsQ0FBQztnQkFDeEIsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFFLENBQUM7YUFDakIsQ0FBQztRQWdDSCxDQUFDO1FBOUJBLFNBQVMsQ0FBQyxDQUFPO1lBQ2hCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BELENBQUM7UUFFRCxNQUFNO1lBQ0wsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7Z0JBQ3RDLE9BQU8sY0FBSSxDQUFBOztjQUVELGdCQUNQLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNO29CQUN4QyxDQUFDLENBQUMsU0FBUztvQkFDWCxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLFFBQVE7d0JBQzdDLENBQUMsQ0FBQyxXQUFXO3dCQUNiLENBQUMsQ0FBQyxFQUNKLEVBQUU7O1FBRUEsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTzs7O2lCQUd4QixDQUFDLENBQU8sRUFBRSxFQUFFO29CQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixDQUFDOzs7S0FHSCxDQUFDO2FBQ0Y7aUJBQU07Z0JBQ04sT0FBTyxjQUFJLENBQUEsYUFBYSxDQUFDO2FBQ3pCO1FBQ0YsQ0FBQztLQUNELENBQUE7SUFwQ0E7UUFEQyxlQUFLLEVBQUU7OzZEQUtOO0lBTkcsbUJBQW1CO1FBSnhCLG1CQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFNBQVMsRUFBRSxLQUFLO1NBQ2hCLENBQUM7T0FDSSxtQkFBbUIsQ0FzQ3hCO0FBQ0YsQ0FBQyxDQUFDO0FBRUYsa0JBQWUsOEJBQThCLENBQUMifQ==