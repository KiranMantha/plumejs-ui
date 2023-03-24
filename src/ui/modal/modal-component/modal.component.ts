import { Component, DomTransition, html, IHooks } from '@plumejs/core';
import { Subject } from 'rxjs';
import { IModalData } from '../modal.interface';
import modalComponentStyles from './modal.component.scss?inline';

@Component({
  selector: 'ui-modal-dialog',
  standalone: true,
  styles: modalComponentStyles,
  deps: [DomTransition]
})
export class ModalComponent implements IHooks {
  readonly ObservedProperties = <const>['modalData'];

  modalData: IModalData;
  onClose: Subject<void> = new Subject();
  onOpen: Subject<void> = new Subject();

  private modalContentRef: HTMLElement;

  constructor(private domSrvc: DomTransition) {}

  async mount() {
    await this.domSrvc.animationsComplete(this.modalContentRef);
    this.onOpen.next();
    this.onOpen.complete();
  }

  unmount() {
    this.onOpen.unsubscribe();
    this.onClose.unsubscribe();
  }

  private async _close() {
    this.modalContentRef.classList.remove('in');
    await this.domSrvc.animationsComplete(this.modalContentRef);
    this.onClose.next();
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
          <div class="modalDialog-header">
            <div class="title">${this.modalData ? this.modalData.title : ''}</div>
            ${this.modalData && this._renderModalCloseButton()}
          </div>
          <div>${this.modalData && this.modalData.bodyTemplate}</div>
        </div>
      </div>
    `;
  }
}
