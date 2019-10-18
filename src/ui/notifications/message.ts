export class Message {
	content: string;
	type: string;
	index: number;
	dismissed: boolean = false;

	constructor(content: string, type?: string) {
		this.content = content;
		this.type = type || "info";
	}
}
