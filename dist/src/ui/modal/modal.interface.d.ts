import { Subject } from 'rxjs';
export interface IModalOptions {
    modalTitle: string;
    renderTemplate: () => any;
    modalClass?: string;
    backdrop?: boolean;
    hideDefaultCloseButton?: boolean;
}
export interface IModalData {
    Id: number;
    title: string;
    bodyTemplate: () => string;
    backdrop: boolean;
    hideDefaultCloseButton: boolean;
}
export interface IModal {
    onClose: Subject<void>;
    onOpen: Subject<void>;
    Id: number;
}
