import { __decorate, __metadata } from "tslib";
import { Injectable } from "@plumejs/core";
import { Message } from "./message";
import registerNotificationsComponent from "./notification.component";
import { NotificationType } from './notification.type';
let NotificationService = class NotificationService {
    constructor() {
        registerNotificationsComponent();
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
    sendMessage(content, type = NotificationType.Info, autoHide = false) {
        const message = new Message(content, type, autoHide);
        this._addMessage(message);
    }
};
NotificationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], NotificationService);
export { NotificationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdWkvbm90aWZpY2F0aW9ucy9ub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sOEJBQThCLE1BQU0sMEJBQTBCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHdkQsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFDL0I7UUFDQyw4QkFBOEIsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFJTyxTQUFTLENBQUMsS0FBa0IsRUFBRSxTQUFzQixRQUFRLENBQUMsSUFBSTtRQUN4RSxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFTyxZQUFZLENBQ25CLEtBQWtCLEVBQ2xCLFNBQXNCLFFBQVEsQ0FBQyxJQUFJO1FBRW5DLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVPLFdBQVcsQ0FBQyxPQUFnQjtRQUNuQyxJQUFJLHFCQUFxQixHQUFRLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUEsQ0FBQztRQUM3RixJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDM0IscUJBQXFCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ3pFLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUMsQ0FBQztTQUN0QztRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQzFCLElBQUksQ0FBQyxlQUFlLEdBQUcscUJBQXFCLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDeEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBYSxFQUFFLEVBQUU7Z0JBQzFELElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtvQkFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO29CQUN6QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztpQkFDNUI7WUFDRixDQUFDLENBQUMsQ0FBQztTQUNIO1FBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQWUsRUFBRSxPQUF5QixnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsV0FBb0IsS0FBSztRQUNyRyxNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0IsQ0FBQztDQUNELENBQUE7QUExQ1ksbUJBQW1CO0lBRC9CLFVBQVUsRUFBRTs7R0FDQSxtQkFBbUIsQ0EwQy9CO1NBMUNZLG1CQUFtQiJ9