import { Component, html, IHooks, Renderer } from '@plumejs/core';
import notificationStyles from './notification.component.scss';
import { INotification } from './notification.type';

@Component({
  selector: 'notification-message',
  styles: notificationStyles
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
    this.notification.dismiss(this.notification.message.index);
  }

  render() {
    if (this.notification && this.notification.message.content) {
      return html`
        <div
          class="notification ${this.notification.message.type === 'info'
            ? 'is-info'
            : this.notification.message.type === 'danger'
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
      return html`<div></div>`;
    }
  }
}
