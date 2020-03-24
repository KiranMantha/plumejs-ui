interface HTMLElement {
	trigger: (eventName: string, isBubbling?: boolean) => void;
	update: () => void;
	getModel: () => { [key: string]: any };
}

interface String {
	translate: (...args: any) => string;
}
