"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@plumejs/core");
let ModalService = class ModalService {
    constructor() {
        this._modalList = new Map();
    }
    _addChild(child, parent = document.body) {
        parent.appendChild(child);
    }
    _removeChild(child, parent = document.body) {
        parent.removeChild(child);
    }
    _addModal(options) {
        const modalDOM = document.createElement('ui-modal-dialog');
        this._addChild(modalDOM);
        const modalRef = modalDOM;
        const model = modalRef.getInstance();
        const modelId = new Date().getTime();
        const modalData = {
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
            modalDOM.classList.add(options.modalClass);
        }
        this._modalList.set(modelId, modalDOM);
        return modalData;
    }
    show(options) {
        if (!options.renderTemplate) {
            throw Error('Provide renderTemplate function to render html inside modal component.');
        }
        return this._addModal(options);
    }
    close(modal) {
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
};
ModalService = tslib_1.__decorate([
    (0, core_1.Injectable)()
], ModalService);
exports.ModalService = ModalService;
