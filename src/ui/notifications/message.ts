export class Message {
	content: string;
	type: string;
	index: number;
	dismissed: boolean = false;
	autoHide: boolean = false;

	constructor(content: string, type?: string, autoHide?: boolean) {
		this.content = content;
		this.type = type || "info";
		this.autoHide = autoHide;
	}
}
