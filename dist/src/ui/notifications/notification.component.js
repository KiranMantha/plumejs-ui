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
            this._notifications = this._notifications.splice(index, 1);
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
                    dismiss: this.dismiss.bind(this),
                    autoHide: msg.autoHide
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
                dismiss: () => { },
                autoHide: false
            };
        }
        inputChanged(oldval, newval) {
            if (newval.autoHide) {
                setTimeout(() => {
                    this.notification.dismiss(this.notification.index);
                }, 2000);
            }
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
							class="dismiss ${this.notification.autoHide ? 'hide-notify' : ''}"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9ub3RpZmljYXRpb25zL25vdGlmaWNhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXlEO0FBQ3pELHVDQUFvQztBQUNwQywrQkFBK0I7QUFTL0IsTUFBTSw4QkFBOEIsR0FBRyxHQUFHLEVBQUU7SUFLM0MsSUFBTSw4QkFBOEIsR0FBcEMsTUFBTSw4QkFBOEI7UUFBcEM7WUFDUyxtQkFBYyxHQUFrQixFQUFFLENBQUM7WUFHM0MsY0FBUyxHQUFvQixJQUFJLGNBQU8sRUFBRSxDQUFDO1FBZ0M1QyxDQUFDO1FBOUJBLGdCQUFnQixDQUFDLE9BQWU7WUFDL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUVPLE9BQU8sQ0FBQyxLQUFhO1lBQzVCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsQ0FBQztRQUVELE1BQU07WUFDTCxPQUFPLGNBQUksQ0FBQTs7T0FFTixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQVksRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDOUMsSUFBSSxNQUFNLEdBQWtCO29CQUMzQixPQUFPLEVBQUUsR0FBRztvQkFDWixLQUFLLEVBQUUsQ0FBQztvQkFDUixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNoQyxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7aUJBQ3RCLENBQUM7Z0JBQ0YsT0FBTyxjQUFJLENBQUE7O3VCQUVNLE1BQU07O09BRXRCLENBQUM7WUFDSCxDQUFDLENBQUU7O0lBRUosQ0FBQztRQUNILENBQUM7S0FDRCxDQUFBO0lBcENLLDhCQUE4QjtRQUpuQyxtQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLHdCQUF3QjtZQUNsQyxRQUFRLEVBQUUsNkJBQTZCO1NBQ3ZDLENBQUM7T0FDSSw4QkFBOEIsQ0FvQ25DO0lBTUQsSUFBTSxtQkFBbUIsR0FBekIsTUFBTSxtQkFBbUI7UUFBekI7WUFFQyxpQkFBWSxHQUFrQjtnQkFDN0IsT0FBTyxFQUFFLElBQUksaUJBQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ3hCLEtBQUssRUFBRSxDQUFDO2dCQUNSLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDO2dCQUNqQixRQUFRLEVBQUUsS0FBSzthQUNmLENBQUM7UUF3Q0gsQ0FBQztRQXRDQSxZQUFZLENBQUMsTUFBcUIsRUFBRSxNQUFxQjtZQUN4RCxJQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Z0JBQ25CLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEQsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ1Q7UUFDRixDQUFDO1FBRUQsU0FBUyxDQUFDLENBQU87WUFDaEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUVELE1BQU07WUFDTCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDdEMsT0FBTyxjQUFJLENBQUE7O2NBRUQsZ0JBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU07b0JBQ3hDLENBQUMsQ0FBQyxTQUFTO29CQUNYLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUTt3QkFDN0MsQ0FBQyxDQUFDLFdBQVc7d0JBQ2IsQ0FBQyxDQUFDLEVBQ0osRUFBRTs7UUFFQSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPOzt3QkFFaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRztpQkFDeEQsQ0FBQyxDQUFPLEVBQUUsRUFBRTtvQkFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsQ0FBQzs7O0tBR0gsQ0FBQzthQUNGO2lCQUFNO2dCQUNOLE9BQU8sY0FBSSxDQUFBLGFBQWEsQ0FBQzthQUN6QjtRQUNGLENBQUM7S0FDRCxDQUFBO0lBN0NBO1FBREMsZUFBSyxFQUFFOzs2REFNTjtJQVBHLG1CQUFtQjtRQUp4QixtQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxTQUFTLEVBQUUsS0FBSztTQUNoQixDQUFDO09BQ0ksbUJBQW1CLENBK0N4QjtBQUNGLENBQUMsQ0FBQztBQUVGLGtCQUFlLDhCQUE4QixDQUFDIn0=