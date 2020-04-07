import { Component, html, Input, IHooks } from "plumejs";
import { Message } from "./message";
import { Subject } from "rxjs";

interface INotification {
	message: Message;
	dismiss: (index: number) => void;
}

const registerNotificationsComponent = () => {
	@Component({
		selector: "notification-container",
		styleUrl: "notification.component.scss"
	})
	class NotificationContainerComponent implements IHooks {
		private _notifications:Array<Message> = [];
		update:any;
		onDismiss: Subject<number> = new Subject();

		constructor() {
			this.dismiss = this.dismiss.bind(this);
		}

		setNotifications(message:Message) {			
			this._notifications.push(message);
			message.index = this._notifications.length -1;
			this.update();
		}

		private dismiss(index: number) {
			this._notifications = this._notifications.filter(m => { if(m.index !== index) return m; });
			this.update();
			this.onDismiss.next(this._notifications.length);
		}

		_renderNotifications() {
			if(this._notifications.length > 0) { 
				let list = this._notifications.map((msg: Message, i) => {
					let notify: INotification = {
						message: msg,
						dismiss: this.dismiss
					};
					return html`
						<notification-message
							notification=${notify}
						></notification-message>
					`;
				});
				return list;
			} else {
				return html`<div></div>`
			}
		}

		unmount() {
			this.onDismiss.complete();
		}

		render() {
			return html`
				<div class="notifications_wrapper">
					${this._renderNotifications()}
				</div>
			`;
		}
	}

	@Component({
		selector: "notification-message",
		useShadow: false
	})
	class NotificationMessage implements IHooks {
		@Input()
		notification: INotification = {
			message: new Message(""),
			dismiss: () => {}
		};

		inputChanged(oldval: INotification, newval: INotification) {
			if(newval.message.autoHide) {
				setTimeout(() => {
					this.notification.dismiss(this.notification.message.index);
				}, 2000);
			}
		}

		onDismiss(e:Event) {
			e.preventDefault();
			this.notification.dismiss(this.notification.message.index);
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
							class="dismiss ${ this.notification.message.autoHide ? 'hide-notify' : '' }"
							onclick=${(e:Event) => {
								this.onDismiss(e);
							}}
						>&times;</button>						
					</div>
				`;
			} else {
				return html`<div></div>`;
			}
		}
	}
};

export default registerNotificationsComponent;
