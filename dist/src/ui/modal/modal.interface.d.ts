import { Subject } from "rxjs";
export interface IModalOptions {
    modalTitle: string;
    renderTemplate: () => any;
    modalClass?: string;
    backdrop?: Boolean;
    hideDefaultCloseButton?: Boolean;
}
export interface IModalData {
    Id: Number;
    title: String;
    bodyTemplate: string;
    backdrop: Boolean;
    hideDefaultCloseButton: Boolean;
}
export interface IModal {
    onClose: Subject<void>;
    onOpen: Subject<void>;
    Id: number;
}
