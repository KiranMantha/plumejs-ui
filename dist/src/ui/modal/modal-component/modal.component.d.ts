import { DomTransition, IHooks } from '@plumejs/core';
import { Subject } from 'rxjs';
import { IModalData } from '../modal.interface';
export declare class ModalComponent implements IHooks {
    private domSrvc;
    modalData: IModalData;
    onClose: Subject<void>;
    onOpen: Subject<void>;
    private modalContentRef;
    private transitionDuration;
    constructor(domSrvc: DomTransition);
    mount(): void;
    private _close;
    private _renderModalCloseButton;
    render(): DocumentFragment;
}
