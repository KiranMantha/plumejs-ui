import { Component, DomTransition, html, IHooks } from "@plumejs/core";
import { Subject } from "rxjs";
import { IModalData } from "../modal.interface";
import modalComponentStyles from './modal.component.scss';

const registerModalComponent = () => {
	@Component({
		selector: "modal-dialog",
		styles: modalComponentStyles
	})
	class ModalComponent implements IHooks {
		modalData: IModalData;
		update: () => void;
		onClose: Subject<void> = new Subject();
		onOpen: Subject<void> = new Subject();
		renderer: HTMLElement;

		private modalContentRef: HTMLElement;
		private transitionDuration: number = 300;

		constructor(private domSrvc: DomTransition) { }

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

		private _close(event: any) {
			this.domSrvc.onTransitionEnd(this.modalContentRef, () => {
				this.onClose.next();
				this.onClose.complete();
			}, this.transitionDuration);
			this.modalContentRef.classList.remove('in');
		}

		private _renderModalCloseButton() {
			if (this.modalData.hideDefaultCloseButton) {
				return html``;
			} else {
				return html`
					<button
						class="btn-close"
						onclick=${(event: any) => { this._close(event); }}
					>
						&times;
					</button>
				`;
			}
		}

		render() {
			return html`
				<div class='modalDialog'>
					<div
						ref=${(node) => { this.modalContentRef = node; }}
						class="modalDialog-content in out"
					>
						<div class="title">
							${this.modalData ? this.modalData.title : ''}
							${this.modalData && this._renderModalCloseButton()}
						</div>
						<div>
							${this.modalData && this.modalData.bodyTemplate}
						</div>
					</div>
				</div>
			`;
		}
	}
};
export default registerModalComponent;
