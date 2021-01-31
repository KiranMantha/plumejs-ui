"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@plumejs/core");
const message_1 = require("./message");
const notification_component_1 = tslib_1.__importDefault(require("./notification.component"));
const notification_type_1 = require("./notification.type");
let NotificationService = class NotificationService {
    constructor() {
        notification_component_1.default();
    }
    _addChild(child, parent = document.body) {
        parent.appendChild(child);
    }
    _removeChild(child, parent = document.body) {
        parent.removeChild(child);
    }
    _addMessage(message) {
        let notificationContainer = document.getElementsByTagName("notification-container")[0];
        ;
        if (!notificationContainer) {
            notificationContainer = document.createElement("notification-container");
            this._addChild(notificationContainer);
        }
        if (!this._containerModel) {
            this._containerModel = notificationContainer.getModel();
            this._containerModel.onDismiss.subscribe((count) => {
                if (count === 0) {
                    this._removeChild(notificationContainer);
                    this._containerModel = null;
                }
            });
        }
        this._containerModel.setNotifications(message);
    }
    sendMessage(content, type = notification_type_1.NotificationType.Info, autoHide = false) {
        const message = new message_1.Message(content, type, autoHide);
        this._addMessage(message);
    }
};
NotificationService = tslib_1.__decorate([
    core_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdWkvbm90aWZpY2F0aW9ucy9ub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBMkM7QUFDM0MsdUNBQW9DO0FBQ3BDLDhGQUFzRTtBQUN0RSwyREFBdUQ7QUFHdkQsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFDL0I7UUFDQyxnQ0FBOEIsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFJTyxTQUFTLENBQUMsS0FBa0IsRUFBRSxTQUFzQixRQUFRLENBQUMsSUFBSTtRQUN4RSxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFTyxZQUFZLENBQ25CLEtBQWtCLEVBQ2xCLFNBQXNCLFFBQVEsQ0FBQyxJQUFJO1FBRW5DLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVPLFdBQVcsQ0FBQyxPQUFnQjtRQUNuQyxJQUFJLHFCQUFxQixHQUFRLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUEsQ0FBQztRQUM3RixJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDM0IscUJBQXFCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ3pFLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUMsQ0FBQztTQUN0QztRQUVELElBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxlQUFlLEdBQUcscUJBQXFCLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDeEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBYSxFQUFFLEVBQUU7Z0JBQzFELElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtvQkFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO29CQUN6QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztpQkFDNUI7WUFDRixDQUFDLENBQUMsQ0FBQztTQUNIO1FBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQWUsRUFBRSxPQUF5QixvQ0FBZ0IsQ0FBQyxJQUFJLEVBQUUsV0FBb0IsS0FBSztRQUNyRyxNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFPLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNCLENBQUM7Q0FDRCxDQUFBO0FBMUNZLG1CQUFtQjtJQUQvQixpQkFBVSxFQUFFOztHQUNBLG1CQUFtQixDQTBDL0I7QUExQ1ksa0RBQW1CIn0=