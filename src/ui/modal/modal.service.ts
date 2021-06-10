import { Injectable } from "@plumejs/core";
import registerModalComponent from "./modal-component/modal.component";
import { IModal, IModalOptions } from "./modal.interface";

@Injectable()
export class ModalService {
	private _modalList: Map<number, HTMLElement> = new Map();

	constructor() {
		registerModalComponent();
	}

	private _addChild(child: HTMLElement, parent: HTMLElement = document.body) {
		parent.appendChild(child);
	}

	private _removeChild(
		child: HTMLElement,
		parent: HTMLElement = document.body
	) {
		parent.removeChild(child);
	}

	private _addModal(options: IModalOptions): IModal {
		const modalRef: any = document.createElement("modal-dialog");
		this._addChild(modalRef);
		const model = modalRef.getModel();
		const modelId = new Date().getTime();
		let modalData: IModal = {
			onClose: model.onClose,
			onOpen: model.onOpen,
			Id: modelId
		};

		model.onClose.subscribe(() => {
			this.close(modalData);
		});

		modalRef.setProps({
			modalData: {
				Id: modelId,
				title: options.modalTitle,
				bodyTemplate: options.renderTemplate(),
				backdrop: options.backdrop || false,
				hideDefaultCloseButton: options.hideDefaultCloseButton || false
			}
		});

		if (!!options.modalClass) {
			modalRef.classList.add(options.modalClass);
		}

		this._modalList.set(modelId, modalRef);
		return modalData;
	}

	show(options: IModalOptions): IModal {
		if (!options.renderTemplate) {
			throw Error("Provide renderTemplate function to render html inside modal component.");
		}
		return this._addModal(options);
	}

	close(modal: IModal) {
		let modalRef = this._modalList.get(modal.Id);
		this._removeChild(modalRef);
		this._modalList.delete(modal.Id);
	}

	closeAll() {
		for (let modalRef of this._modalList.values()) {
			this._removeChild(modalRef);
		}
		this._modalList.clear();
	}
}
