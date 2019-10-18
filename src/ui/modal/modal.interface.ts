import { Subject } from "rxjs";

export interface IModalOptions {
	modalTitle: string;
	bodyTemplate: string;
	modalClass?: string;
	backdrop?: Boolean;
	hideDefaultCloseButton?: Boolean;
}

export interface IModal {
	onClose: Subject<void>;
	onOpen: Subject<void>;
	Id: Number;
}
