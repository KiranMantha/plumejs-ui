import { IModal, IModalOptions } from "./modal.interface";
export declare class ModalService {
    private _modalList;
    constructor();
    private _addChild;
    private _removeChild;
    private _addModal;
    show(options: IModalOptions): IModal;
    close(modal: IModal): void;
    closeAll(): void;
}
