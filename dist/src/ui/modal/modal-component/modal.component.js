import { Component, DomTransition, html, Input, useRef } from "@plumejs/core";
import { Subject } from "rxjs";
import modalComponentStyles from './modal.component.scss';
const registerModalComponent = () => {
    class ModalComponent {
        constructor(domSrvc) {
            this.domSrvc = domSrvc;
            this.modalData = {
                Id: 0,
                title: "",
                bodyTemplate: "",
                backdrop: false,
                isModalOpen: false,
                hideDefaultCloseButton: false
            };
            this.modalContentRef = useRef(null);
            this.onClose = new Subject();
            this.onOpen = new Subject();
            this.transitionDuration = 300;
        }
        static get inputProp() {
            return "modalData";
        }
        close(event) {
            this.domSrvc.onTransitionEnd(this.modalContentRef.current, () => {
                this.onClose.next();
            }, this.transitionDuration);
            this.modalData.isModalOpen = false;
            this.update();
        }
        mount() {
            this.domSrvc.onTransitionEnd(this.modalContentRef.current, () => {
                this.onOpen.next();
            }, this.transitionDuration);
        }
        render() {
            return html `
				<div class='modalDialog'>
					<div
						ref=${this.modalContentRef}
						class=${`modalDialog-content  ${this.modalData.isModalOpen ? "in out" : "out"}`}
					>
						<div class="title">
							${this.modalData.title}
							${this.modalData.hideDefaultCloseButton
                ? html ``
                : html `
										<button
											class="btn-close"
											onclick=${(event) => { this.close(event); }}
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
    Component({
		selector: "modal-dialog",
		styles: modalComponentStyles
	})(["DomTransition", ModalComponent]);
};
export default registerModalComponent;
