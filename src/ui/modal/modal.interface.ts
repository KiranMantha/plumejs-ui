import { Subject } from "rxjs";

export interface IModalOptions {
	modalTitle: string;
	bodyTemplate: string;
	modalClass?: string;
	backdrop?: Boolean;
	hideDefaultCloseButton?: Boolean;
	data?: any;
}

export interface IModalData {
	Id: Number;
	title: String;
	bodyTemplate: string;
	modalClass: String;
	backdrop: Boolean;
	isModalOpen: Boolean;
	hideDefaultCloseButton: Boolean;
	data?:any;
}

export interface IModal {
	onClose: Subject<void>;
	onOpen: Subject<void>;
	Id: Number;
}
