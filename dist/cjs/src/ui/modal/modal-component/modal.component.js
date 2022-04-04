"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@plumejs/core");
const rxjs_1 = require("rxjs");
const modal_component_scss_1 = (0, tslib_1.__importDefault)(require("./modal.component.scss"));
let ModalComponent = class ModalComponent {
    constructor(domSrvc) {
        this.domSrvc = domSrvc;
        this.ObservedProperties = ['modalData'];
        this.onClose = new rxjs_1.Subject();
        this.onOpen = new rxjs_1.Subject();
        this.transitionDuration = 300;
    }
    mount() {
        this.domSrvc.onTransitionEnd(this.modalContentRef, () => {
            this.onOpen.next();
            this.onOpen.complete();
        }, this.transitionDuration);
    }
    unmount() {
        this.onOpen.unsubscribe();
        this.onClose.unsubscribe();
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
            return (0, core_1.html) ``;
        }
        else {
            return (0, core_1.html) `
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
        return (0, core_1.html) `
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
ModalComponent = (0, tslib_1.__decorate)([
    (0, core_1.Component)({
        selector: 'ui-modal-dialog',
        styles: modal_component_scss_1.default,
        deps: [core_1.DomTransition]
    }),
    (0, tslib_1.__metadata)("design:paramtypes", [core_1.DomTransition])
], ModalComponent);
exports.ModalComponent = ModalComponent;
