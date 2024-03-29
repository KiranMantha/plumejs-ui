import { ComponentRef, Injectable } from '@plumejs/core';
import { ModalComponent } from './modal-component/modal.component';
import { IModal, IModalOptions } from './modal.interface';

@Injectable()
export class ModalService {
  private _modalList: Map<number, HTMLElement> = new Map();

  private _addChild(child: HTMLElement, parent: HTMLElement = document.body) {
    parent.appendChild(child);
  }

  private _removeChild(child: HTMLElement, parent: HTMLElement = document.body) {
    parent.removeChild(child);
  }

  private _addModal(options: IModalOptions): IModal {
    const modalDOM = document.createElement('ui-modal-dialog');
    this._addChild(modalDOM);
    const modalRef = modalDOM as unknown as ComponentRef<ModalComponent>;
    const model = modalRef.getInstance();
    const modelId = new Date().getTime();
    const modalData: IModal = {
      onClose: model.onClose,
      onOpen: model.onOpen,
      Id: modelId
    };

    model.onClose.subscribe(() => {
      this.close(modalData);
    });

    modalRef.setProps({
      modalData: {
        Id: modelId,
        title: options.modalTitle,
        bodyTemplate: options.renderTemplate,
        backdrop: options.backdrop || false,
        hideDefaultCloseButton: options.hideDefaultCloseButton || false
      }
    });

    if (!!options.modalClass) {
      modalDOM.classList.add(options.modalClass);
    }

    this._modalList.set(modelId, modalDOM);
    return modalData;
  }

  show(options: IModalOptions): IModal {
    if (!options.renderTemplate) {
      throw Error('Provide renderTemplate function to render html inside modal component.');
    }
    return this._addModal(options);
  }

  close(modal: IModal) {
    const modalRef = this._modalList.get(modal.Id);
    this._removeChild(modalRef);
    this._modalList.delete(modal.Id);
  }

  closeAll() {
    for (const modalRef of this._modalList.values()) {
      this._removeChild(modalRef);
    }
    this._modalList.clear();
  }
}
