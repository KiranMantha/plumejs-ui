import { Component, DomTransition, html, Input, Ref, useRef } from "@plumejs/core";
import { Subject } from "rxjs";
import { IModalData } from "../modal.interface";
import modalComponentStyles from './modal.component.scss';

const registerModalComponent = () => {
	@Component({
		selector: "modal-dialog",
		styles: modalComponentStyles
	})
	class ModalComponent {
		constructor(private domSrvc: DomTransition) { }

		@Input
		modalData: IModalData = {
			Id: 0,
			title: "",
			bodyTemplate: "",
			backdrop: false,
			isModalOpen: false,
			hideDefaultCloseButton: false
		};

		modalContentRef: Ref<HTMLElement> = useRef(null);
		update: Function;
		onClose: Subject<void> = new Subject();
		onOpen: Subject<void> = new Subject();
		transitionDuration: number = 300;

		private close(event: any) {
			this.domSrvc.onTransitionEnd(
				this.modalContentRef.current,
				() => {
					this.onClose.next();
				},
				this.transitionDuration
			);
			this.modalData.isModalOpen = false;
			this.update();
		}

		mount() {
			this.domSrvc.onTransitionEnd(
				this.modalContentRef.current,
				() => {
					this.onOpen.next();
				},
				this.transitionDuration
			);
		}

		render() {
			return html`
				<div class='modalDialog'>
					<div
						ref=${this.modalContentRef}
						class=${`modalDialog-content  ${this.modalData.isModalOpen ? "in out" : "out"
				}`}
					>
						<div class="title">
							${this.modalData.title}
							${this.modalData.hideDefaultCloseButton
					? html``
					: html`
										<button
											class="btn-close"
											onclick=${(event: any) => { this.close(event); }}
										>
											&times;
										</button>
								  `}
						</div>
						<div>
							${this.modalData.bodyTemplate}
						</div>
					</div>
				</div>
			`;
		}
	}
};
export default registerModalComponent;
