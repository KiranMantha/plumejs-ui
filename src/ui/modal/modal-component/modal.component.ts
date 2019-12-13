import { Component, html, Input, useRef, DomTransition } from "plumejs";
import { Subject } from "rxjs";
import { IModalData } from "../modal.interface";

const registerModalComponent = () => {
	@Component({
		selector: "modal-dialog",
		styleUrl: "ui/modal/modal-component/modal.component.scss"
	})
	class ModalComponent {
		constructor(private domSrvc: DomTransition) {}

		@Input()
		modalData: IModalData = {
			Id: 0,
			title: "",
			bodyTemplate: "",
			modalClass: "",
			backdrop: false,
			isModalOpen: false,
			hideDefaultCloseButton: false
		};

		modalContentRef: any;
		update: any;
		onClose: Subject<void> = new Subject();
		onOpen: Subject<void> = new Subject();
		transitionDuration: number = 300;

		private close(event: any) {
			this.modalData.isModalOpen = false;
			this.domSrvc.onTransitionEnd(
				this.modalContentRef.current,
				() => {
					this.onClose.next();
				},
				this.transitionDuration
			);
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
			this.modalContentRef = useRef(null);
			return html`
				<div class=${`modalDialog ${this.modalData.modalClass} `}>
					<div
						ref=${this.modalContentRef}
						class=${`modalDialog-content  ${
							this.modalData.isModalOpen ? "in out" : "out"
						}`}
					>
						<div class="title">
							${this.modalData.title}
							${this.modalData.hideDefaultCloseButton
								? html``
								: html`
										<button
											class="btn-close"
											onclick=${(event: any) => {
												this.close(event);
											}}
										>
											&times;
										</button>
								  `}
						</div>
						<div>
							${ this.modalData.bodyTemplate }
						</div>
					</div>
				</div>
			`;
		}
	}
};
export default registerModalComponent;