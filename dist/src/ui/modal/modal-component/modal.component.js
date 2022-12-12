import { __decorate, __metadata } from "tslib";
import { Component, DomTransition, html } from '@plumejs/core';
import { Subject } from 'rxjs';
import modalComponentStyles from './modal.component.scss';
let ModalComponent = class ModalComponent {
    domSrvc;
    ObservedProperties = ['modalData'];
    modalData;
    onClose = new Subject();
    onOpen = new Subject();
    modalContentRef;
    constructor(domSrvc) {
        this.domSrvc = domSrvc;
    }
    async mount() {
        await this.domSrvc.animationsComplete(this.modalContentRef);
        this.onOpen.next();
        this.onOpen.complete();
    }
    unmount() {
        this.onOpen.unsubscribe();
        this.onClose.unsubscribe();
    }
    async _close() {
        this.modalContentRef.classList.remove('in');
        await this.domSrvc.animationsComplete(this.modalContentRef);
        this.onClose.next();
    }
    _renderModalCloseButton() {
        if (this.modalData.hideDefaultCloseButton) {
            return html ``;
        }
        else {
            return html `
        <button
          class="btn-close"
          onclick=${() => {
                this._close();
            }}
        >
          &times;
        </button>
      `;
        }
    }
    render() {
        return html `
      <div class="modalDialog" part="modalDialog">
        <div
          ref=${(node) => {
            this.modalContentRef = node;
        }}
          class="modalDialog-content in out"
        >
          <div class="modalDialog-header">
            <div class="title">${this.modalData ? this.modalData.title : ''}</div>
            ${this.modalData && this._renderModalCloseButton()}
          </div>
          <div>${this.modalData && this.modalData.bodyTemplate}</div>
        </div>
      </div>
    `;
    }
};
ModalComponent = __decorate([
    Component({
        selector: 'ui-modal-dialog',
        standalone: true,
        styles: modalComponentStyles,
        deps: [DomTransition]
    }),
    __metadata("design:paramtypes", [DomTransition])
], ModalComponent);
export { ModalComponent };
