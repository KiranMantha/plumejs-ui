import { Injectable } from "@plumejs/core";
import registerModalComponent from "./modal-component/modal.component";
export class ModalService {
    constructor() {
        this._modalList = new Map();
        registerModalComponent();
    }
    _addChild(child, parent = document.body) {
        parent.appendChild(child);
    }
    _removeChild(child, parent = document.body) {
        parent.removeChild(child);
    }
    _addModal(options) {
        const modalRef = document.createElement("modal-dialog");
        this._addChild(modalRef);
        const model = modalRef.getModel();
        const modelId = new Date().getTime();
        let modalData = {
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
                bodyTemplate: options.renderTemplate(),
                backdrop: options.backdrop || false,
                hideDefaultCloseButton: options.hideDefaultCloseButton || false
            }
        });
        if (!!options.modalClass) {
            modalRef.classList.add(options.modalClass);
        }
        this._modalList.set(modelId, modalRef);
        return modalData;
    }
    show(options) {
        if (!options.renderTemplate) {
            throw Error("Provide renderTemplate function to render html inside modal component.");
        }
        return this._addModal(options);
    }
    close(modal) {
        let modalRef = this._modalList.get(modal.Id);
        this._removeChild(modalRef);
        this._modalList.delete(modal.Id);
    }
    closeAll() {
        for (let modalRef of this._modalList.values()) {
            this._removeChild(modalRef);
        }
        this._modalList.clear();
    }
}
Injectable("ModalService")([ModalService]);
