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
    modalClass: String;
    backdrop: Boolean;
    isModalOpen: Boolean;
    hideDefaultCloseButton: Boolean;
}
export interface IModal {
    onClose: Subject<void>;
    onOpen: Subject<void>;
    Id: Number;
}
