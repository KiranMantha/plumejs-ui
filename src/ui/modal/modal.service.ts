import { Injectable } from "plumejs";
import { IModal, IModalOptions } from "./modal.interface";
import registerModalComponent from "./modal-component/modal.component";

@Injectable()
export class ModalService {
	private _modalList: Array<HTMLElement> = [];

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
		let modal: IModal = {
			onClose: model.onClose,
			onOpen: model.onOpen,
			Id: modelId
		};

		model.onClose.subscribe(() => {
			this.close(modal);
		});

		model.modalData = {
			Id: modelId,
			title: options.modalTitle,
			bodyTemplate: options.bodyTemplate,
			modalClass: options.modalClass || "",
			backdrop: options.backdrop || false,
			isModalOpen: true,
			hideDefaultCloseButton: options.hideDefaultCloseButton || false,
			componentData: options.data ? options.data : {}
		};
		model.update();
		this._modalList.push(modalRef);
		return modal;
	}

	private _close(modalRef: any, index: number) {
		index > -1 && this._modalList.splice(index, 1);
		this._removeChild(modalRef);
	}

	show(options: IModalOptions): IModal {
		if (!options.bodyTemplate) {
			throw Error("Provide bodyTemplate");
		}
		return this._addModal(options);
	}

	close(modal: IModal) {
		let index = -1;
		let modalRef = this._modalList.filter((x, i) => {
			if (x.getModel().modalData.Id === modal.Id) {
				index = i;
				return x;
			}
		})[0];
		modalRef && this._close(modalRef, index);
	}

	closeAll() {
		this._modalList.forEach((modalRef, i) => {
			this._close(modalRef, i);
		});
	}
}
