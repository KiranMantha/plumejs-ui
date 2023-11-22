import { DomTransition, IHooks } from '@plumejs/core';
import { Subject } from 'rxjs';
import { IModalData } from '../modal.interface';
export declare class ModalComponent implements IHooks {
    private domSrvc;
    static readonly observedProperties: readonly ["modalData"];
    modalData: IModalData;
    onClose: Subject<void>;
    onOpen: Subject<void>;
    private modalContentRef;
    constructor(domSrvc: DomTransition);
    mount(): Promise<void>;
    unmount(): void;
    private _close;
    private _renderModalCloseButton;
    render(): DocumentFragment;
}
