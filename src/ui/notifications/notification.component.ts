import { Component, html, Input } from "plumejs";
import { Message } from "./message";
import { Subject } from "rxjs";

interface INotification {
	message: Message;
	index: number;
	dismiss: (index: number) => void;
}

const registerNotificationsComponent = () => {
	@Component({
		selector: "notification-container",
		styleUrl: "ui/notifications/notification.component.scss"
	})
	class NotificationContainerComponent {
		private _notifications:Array<Message> = [];
		update:any;

		onDismiss: Subject<number> = new Subject();

		setNotifications(message:Message){
			this._notifications.push(message);
			this.update();
		}

		private dismiss(index: number) {
			this._notifications.splice(index, 1);
			this.update();
			this.onDismiss.next(this._notifications.length);
		}

		render() {
			return html`
				<div class="notifications_wrapper">
					${this._notifications.map((msg: Message, i) => {
						let notify: INotification = {
							message: msg,
							index: i,
							dismiss: this.dismiss.bind(this)
						};
						return html`
							<notification-message
								notification=${notify}
							></notification-message>
						`;
					})}
				</div>
			`;
		}
	}

	@Component({
		selector: "notification-message",
		useShadow: false
	})
	class NotificationMessage {
		@Input()
		notification: INotification = {
			message: new Message(""),
			index: 0,
			dismiss: () => {}
		};

		onDismiss(e:Event) {
			e.preventDefault();
			this.notification.dismiss(this.notification.index);
		}

		render() {
			if (this.notification.message.content) {
				return html`
					<div
						class=${`notification ${
							this.notification.message.type === "info"
								? "is-info"
								: this.notification.message.type === "danger"
								? "is-danger"
								: ""
						}`}
					>
						${this.notification.message.content}
						<button
							class="dismiss"
							onclick=${(e:Event) => {
								this.onDismiss(e);
							}}
						>&times;</button>						
					</div>
				`;
			} else {
				return html``;
			}
		}
	}
};

export default registerNotificationsComponent;
