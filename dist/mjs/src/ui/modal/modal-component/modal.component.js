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
    transitionDuration = 300;
    constructor(domSrvc) {
        this.domSrvc = domSrvc;
    }
    mount() {
        this.domSrvc.onTransitionEnd(this.modalContentRef, () => {
            this.onOpen.next();
            this.onOpen.complete();
        }, this.transitionDuration);
    }
    _close() {
        this.domSrvc.onTransitionEnd(this.modalContentRef, () => {
            this.onClose.next();
            this.onClose.complete();
        }, this.transitionDuration);
        this.modalContentRef.classList.remove('in');
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
      <div class="modalDialog">
        <div
          ref=${(node) => {
            this.modalContentRef = node;
        }}
          class="modalDialog-content in out"
        >
          <div class="title">
            ${this.modalData ? this.modalData.title : ''} ${this.modalData && this._renderModalCloseButton()}
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
        styles: modalComponentStyles
    }),
    __metadata("design:paramtypes", [DomTransition])
], ModalComponent);
export { ModalComponent };
