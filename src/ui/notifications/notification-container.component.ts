import { Component, ComponentRef, html, IHooks } from '@plumejs/core';
import { Subject } from 'rxjs';
import { Message } from './message';
import notificationContainerStyles from './notification-container.component.scss?inline';
import { NotificationMessage } from './notification.component';
import { INotification } from './notification.type';

@Component({
  selector: 'ui-notification-container',
  styles: notificationContainerStyles,
  standalone: true
})
export class NotificationContainerComponent implements IHooks {
  private _notifications: Array<Message> = [];
  onDismiss: Subject<number> = new Subject();

  setNotifications(message: Message) {
    this._notifications = [message, ...this._notifications];
    message.index = this._notifications.length - 1;
  }

  private dismiss(index: number) {
    this._notifications = this._notifications.filter((m) => {
      if (m.index !== index) return m;
    });
    this.onDismiss.next(this._notifications.length);
  }

  private _renderNotification(target: ComponentRef<NotificationMessage>, notification: INotification) {
    target.setProps({ notification });
    if (notification.message.autoHide) {
      setTimeout(() => {
        notification.dismiss();
      }, 2000);
    }
  }

  _renderNotifications() {
    if (this._notifications.length > 0) {
      const list = this._notifications.map((msg: Message) => {
        const notify: INotification = {
          message: msg,
          dismiss: () => {
            this.dismiss(msg.index);
          }
        };
        return html`
          <ui-notification-message
            onrendered=${(e) => {
              this._renderNotification(e.target, notify);
            }}
          ></ui-notification-message>
        `;
      });
      return list;
    } else {
      return html`<div></div>`;
    }
  }

  unmount() {
    this.onDismiss.unsubscribe();
  }

  render() {
    return html` <div class="notifications_wrapper" part="notifications_wrapper">${this._renderNotifications()}</div> `;
  }
}
