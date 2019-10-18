import { Component, html, Input, useRef } from "plumejs";
import { Subject } from "rxjs";

interface IModalData {
	Id: Number;
	title: String;
	bodyTemplate: string;
	modalClass: String;
	backdrop: Boolean;
	isModalOpen: Boolean;
	hideDefaultCloseButton: Boolean;
}

const registerModalComponent = () => {
	@Component({
		selector: "modal-dialog",
		styleUrl: "ui/modal/modal-component/modal.component.scss"
	})
	class ModalComponent {
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

    modalContentRef:any;
		update: any;
		onClose: Subject<void> = new Subject();
		onOpen: Subject<void> = new Subject();

		private close(event: any) {
			this.modalData.isModalOpen = false;
			this.update();
		}

		private setAnimations() {
			this.modalContentRef.current.addEventListener('transitionend', () => {
				this.modalData.isModalOpen ? this.onOpen.next() : this.onClose.next();
			}, false);
		}

		mount() {
			this.setAnimations();
		}

		unmount(){
			this.modalContentRef.current.removeEventListener('transitionend');
		}

		render() {
			const stringArray = [`${this.modalData.bodyTemplate}`] as any;
			stringArray.raw = [`${this.modalData.bodyTemplate}`];
			this.modalContentRef = useRef(null);
			return html`
				<div class=${`modalDialog ${this.modalData.modalClass} `}>
					<div ref=${this.modalContentRef}
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
							${html(stringArray)}
						</div>
					</div>
				</div>
			`;
		}
	}
};
export default registerModalComponent;
