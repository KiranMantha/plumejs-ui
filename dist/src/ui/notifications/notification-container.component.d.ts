import { IHooks } from '@plumejs/core';
import { Subject } from 'rxjs';
import { Message } from './message';
export declare class NotificationContainerComponent implements IHooks {
    private _notifications;
    onDismiss: Subject<number>;
    setNotifications(message: Message): void;
    private dismiss;
    private _renderNotification;
    _renderNotifications(): DocumentFragment | DocumentFragment[];
    unmount(): void;
    render(): DocumentFragment;
}
