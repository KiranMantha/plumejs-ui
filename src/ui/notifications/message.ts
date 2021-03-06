import { NotificationType } from './notification.type';

export class Message {
	content: string;
	type: string;
	index: number;
	autoHide: boolean = false;

	constructor(content: string, type: string = NotificationType.Info, autoHide: boolean = false) {
		this.content = content;
		this.type = type;
		this.autoHide = autoHide;
	}
}
