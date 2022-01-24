import { ComponentRef, Injectable } from '@plumejs/core';
import { Message } from './message';
import { NotificationContainerComponent } from './notification-container.component';
import { NotificationType } from './notification.type';

@Injectable({ name: 'NotificationService' })
export class NotificationService {
  private _containerModel: NotificationContainerComponent;

  sendMessage(content: string, type: NotificationType = NotificationType.Info, autoHide = false) {
    const message = new Message(content, type, autoHide);
    this._addMessage(message);
  }

  private _addChild(child: HTMLElement, parent: HTMLElement = document.body) {
    parent.appendChild(child);
  }

  private _removeChild(child: HTMLElement, parent: HTMLElement = document.body) {
    parent.removeChild(child);
  }

  private _addMessage(message: Message) {
    let notificationContainer: HTMLElement = document.getElementsByTagName(
      'ui-notification-container'
    )[0] as HTMLElement;
    if (!notificationContainer) {
      notificationContainer = document.createElement('ui-notification-container');
      this._addChild(notificationContainer);
    }

    if (!this._containerModel) {
      const notificationContainerRef = notificationContainer as unknown as ComponentRef<NotificationContainerComponent>;
      this._containerModel = notificationContainerRef.getInstance();
      this._containerModel.onDismiss.subscribe((count: number) => {
        if (count === 0) {
          this._removeChild(notificationContainer);
          this._containerModel = null;
        }
      });
    }

    this._containerModel.setNotifications(message);
  }
}
