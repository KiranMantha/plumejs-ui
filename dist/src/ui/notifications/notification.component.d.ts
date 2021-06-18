import { IHooks } from '@plumejs/core';
import { Subject } from 'rxjs';
import { Message } from './message';
export interface INotification {
    message: Message;
    dismiss: (index: number) => void;
}
export declare class NotificationContainerComponent implements IHooks {
    private renderer;
    private _notifications;
    onDismiss: Subject<number>;
    constructor();
    setNotifications(message: Message): void;
    private dismiss;
    private _renderNotification;
    _renderNotifications(): DocumentFragment | DocumentFragment[];
    unmount(): void;
    render(): DocumentFragment;
}
export declare class NotificationMessage implements IHooks {
    readonly ObservedProperties: readonly ["notification"];
    private renderer;
    notification: INotification;
    mount(): void;
    onDismiss(e: Event): void;
    render(): DocumentFragment;
}
