"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@plumejs/core");
const modal_component_1 = tslib_1.__importDefault(require("./modal-component/modal.component"));
let ModalService = class ModalService {
    constructor() {
        this._modalList = [];
        modal_component_1.default();
    }
    _addChild(child, parent = document.body) {
        parent.appendChild(child);
    }
    _removeChild(child, parent = document.body) {
        parent.removeChild(child);
    }
    _addModal(options) {
        const modalRef = document.createElement("modal-dialog");
        this._addChild(modalRef);
        const model = modalRef.getModel();
        const modelId = new Date().getTime();
        let modal = {
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
            bodyTemplate: options.renderTemplate(),
            backdrop: options.backdrop || false,
            isModalOpen: true,
            hideDefaultCloseButton: options.hideDefaultCloseButton || false
        };
        if (!!options.modalClass) {
            modalRef.classList.add(options.modalClass);
        }
        model.update();
        this._modalList.push(modalRef);
        return modal;
    }
    _close(modalRef, index) {
        index > -1 && this._modalList.splice(index, 1);
        this._removeChild(modalRef);
    }
    show(options) {
        if (!options.renderTemplate) {
            throw Error("Provide renderTemplate function to render html inside modal component.");
        }
        return this._addModal(options);
    }
    close(modal) {
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
};
ModalService = tslib_1.__decorate([
    core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], ModalService);
exports.ModalService = ModalService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9tb2RhbC9tb2RhbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUEyQztBQUUzQyxnR0FBdUU7QUFHdkUsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQUd4QjtRQUZRLGVBQVUsR0FBdUIsRUFBRSxDQUFDO1FBRzNDLHlCQUFzQixFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVPLFNBQVMsQ0FBQyxLQUFrQixFQUFFLFNBQXNCLFFBQVEsQ0FBQyxJQUFJO1FBQ3hFLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVPLFlBQVksQ0FDbkIsS0FBa0IsRUFDbEIsU0FBc0IsUUFBUSxDQUFDLElBQUk7UUFFbkMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRU8sU0FBUyxDQUFDLE9BQXNCO1FBQ3ZDLE1BQU0sUUFBUSxHQUFRLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyQyxJQUFJLEtBQUssR0FBVztZQUNuQixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87WUFDdEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO1lBQ3BCLEVBQUUsRUFBRSxPQUFPO1NBQ1gsQ0FBQztRQUVGLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBRUgsS0FBSyxDQUFDLFNBQVMsR0FBRztZQUNqQixFQUFFLEVBQUUsT0FBTztZQUNYLEtBQUssRUFBRSxPQUFPLENBQUMsVUFBVTtZQUN6QixZQUFZLEVBQUUsT0FBTyxDQUFDLGNBQWMsRUFBRTtZQUN0QyxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVEsSUFBSSxLQUFLO1lBQ25DLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxzQkFBc0IsSUFBSSxLQUFLO1NBQy9ELENBQUM7UUFFRixJQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3hCLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMzQztRQUVELEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUVPLE1BQU0sQ0FBQyxRQUFhLEVBQUUsS0FBYTtRQUMxQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksQ0FBQyxPQUFzQjtRQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRTtZQUM1QixNQUFNLEtBQUssQ0FBQyx3RUFBd0UsQ0FBQyxDQUFDO1NBQ3RGO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxLQUFLLENBQUMsS0FBYTtRQUNsQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNmLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzlDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssS0FBSyxDQUFDLEVBQUUsRUFBRTtnQkFDM0MsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDVixPQUFPLENBQUMsQ0FBQzthQUNUO1FBQ0YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDTixRQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELFFBQVE7UUFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRCxDQUFBO0FBL0VZLFlBQVk7SUFEeEIsaUJBQVUsRUFBRTs7R0FDQSxZQUFZLENBK0V4QjtBQS9FWSxvQ0FBWSJ9