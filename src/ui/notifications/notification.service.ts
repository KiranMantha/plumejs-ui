import { Injectable } from "plumejs";
import { Message } from "./message";
import registerNotificationsComponent from "./notification.component";

@Injectable()
export class NotificationService {
	constructor() {
		registerNotificationsComponent();
	}

	private _containerModel:any;

	private _addChild(child: HTMLElement, parent: HTMLElement = document.body) {
		parent.appendChild(child);
	}

	private _removeChild(
		child: HTMLElement,
		parent: HTMLElement = document.body
	) {
		parent.removeChild(child);
	}

	private _addMessage(message: Message) {
		let notificationContainer: any = document.getElementsByTagName("notification-container")[0];;
		if (!notificationContainer) {
			notificationContainer = document.createElement("notification-container");
			this._addChild(notificationContainer);
		}

		if(!this._containerModel) {
			this._containerModel = notificationContainer.getModel();
			this._containerModel.onDismiss.subscribe((count: number) => {
				if (count === 0) {
					this._removeChild(notificationContainer);
					this._containerModel = null;
				}
			});
		}

		this._containerModel.setNotifications(message);
	}

	sendMessage(content: string, type: string = "info") {
		const message = new Message(content, type);
		this._addMessage(message);
	}
}
