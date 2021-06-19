import { IHooks, Renderer } from '@plumejs/core';
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
    constructor(renderer: Renderer);
    setNotifications(message: Message): void;
    private dismiss;
    private _renderNotification;
    _renderNotifications(): DocumentFragment | DocumentFragment[];
    unmount(): void;
    render(): DocumentFragment;
}
export declare class NotificationMessage implements IHooks {
    private renderer;
    readonly ObservedProperties: readonly ["notification"];
    notification: INotification;
    constructor(renderer: Renderer);
    mount(): void;
    onDismiss(e: Event): void;
    render(): DocumentFragment;
}
