import { Component, DomTransition, html } from '@plumejs/core';
import { Subject } from 'rxjs';
import modalComponentStyles from './modal.component.scss';
export class ModalComponent {
    constructor(domSrvc) {
        this.domSrvc = domSrvc;
        this.onClose = new Subject();
        this.onOpen = new Subject();
        this.transitionDuration = 300;
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
}
Component({
  selector: 'modal-dialog',
  styles: modalComponentStyles
})(["DomTransition", ModalComponent]);
