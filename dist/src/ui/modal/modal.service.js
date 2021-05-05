import { Injectable } from "@plumejs/core";
import registerModalComponent from "./modal-component/modal.component";
export class ModalService {
    constructor() {
        this._modalList = [];
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
        let modal = {
            onClose: model.onClose,
            onOpen: model.onOpen,
            Id: modelId
        };
        model.onClose.subscribe(() => {
            this.close(modal);
        });
        model.modalData = {
            Id: modelId,
            title: options.modalTitle,
            bodyTemplate: options.renderTemplate(),
            backdrop: options.backdrop || false,
            isModalOpen: true,
            hideDefaultCloseButton: options.hideDefaultCloseButton || false
        };
        if (!!options.modalClass) {
            modalRef.classList.add(options.modalClass);
        }
        model.update();
        this._modalList.push(modalRef);
        return modal;
    }
    _close(modalRef, index) {
        index > -1 && this._modalList.splice(index, 1);
        this._removeChild(modalRef);
    }
    show(options) {
        if (!options.renderTemplate) {
            throw Error("Provide renderTemplate function to render html inside modal component.");
        }
        return this._addModal(options);
    }
    close(modal) {
        let index = -1;
        let modalRef = this._modalList.filter((x, i) => {
            if (x.getModel().modalData.Id === modal.Id) {
                index = i;
                return x;
            }
        })[0];
        modalRef && this._close(modalRef, index);
    }
    closeAll() {
        this._modalList.forEach((modalRef, i) => {
            this._close(modalRef, i);
        });
    }
}
Injectable("ModalService")([ModalService]);
