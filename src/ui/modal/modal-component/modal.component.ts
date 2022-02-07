import { Component, DomTransition, html, IHooks } from '@plumejs/core';
import { Subject } from 'rxjs';
import { IModalData } from '../modal.interface';
import modalComponentStyles from './modal.component.scss';

@Component({
  selector: 'ui-modal-dialog',
  styles: modalComponentStyles,
  deps: [DomTransition]
})
export class ModalComponent implements IHooks {
  readonly ObservedProperties = <const>['modalData'];

  modalData: IModalData;
  onClose: Subject<void> = new Subject();
  onOpen: Subject<void> = new Subject();

  private modalContentRef: HTMLElement;
  private transitionDuration = 300;

  constructor(private domSrvc: DomTransition) {}

  mount() {
    this.domSrvc.onTransitionEnd(
      this.modalContentRef,
      () => {
        this.onOpen.next();
        this.onOpen.complete();
      },
      this.transitionDuration
    );
  }

  unmount() {
    this.onOpen.unsubscribe();
    this.onClose.unsubscribe();
  }

  private _close() {
    this.domSrvc.onTransitionEnd(
      this.modalContentRef,
      () => {
        this.onClose.next();
        this.onClose.complete();
      },
      this.transitionDuration
    );
    this.modalContentRef.classList.remove('in');
  }

  private _renderModalCloseButton() {
    if (this.modalData.hideDefaultCloseButton) {
      return html``;
    } else {
      return html`
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
    return html`
      <div class="modalDialog" part="modalDialog">
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
