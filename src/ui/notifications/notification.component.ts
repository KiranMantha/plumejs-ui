import { Component, html, IHooks, Renderer } from '@plumejs/core';
import notificationStyles from './notification.component.scss';
import { INotification, NotificationType } from './notification.type';

@Component({
  selector: 'ui-notification-message',
  standalone: true,
  styles: notificationStyles,
  deps: [Renderer]
})
export class NotificationMessage implements IHooks {
  readonly ObservedProperties = <const>['notification'];
  notification: INotification;

  constructor(private renderer: Renderer) {}

  mount() {
    this.renderer.emitEvent('rendered');
  }

  onDismiss(e: Event) {
    e.preventDefault();
    this.notification.dismiss();
  }

  render() {
    if (this.notification && this.notification.message.content) {
      return html`
        <div
          part="notification"
          class="notification ${this.notification.message.type === NotificationType.Info
            ? 'is-info'
            : this.notification.message.type === NotificationType.Danger
            ? 'is-danger'
            : ''}"
        >
          ${this.notification.message.content}
          <button
            class="dismiss ${this.notification.message.autoHide ? 'hide-notify' : ''}"
            onclick=${(e: Event) => {
              this.onDismiss(e);
            }}
          >
            &times;
          </button>
        </div>
      `;
    } else {
      return html``;
    }
  }
}
