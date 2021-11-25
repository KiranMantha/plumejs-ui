import { IHooks, Renderer } from '@plumejs/core';
import { Subject } from 'rxjs';
import { Message } from './message';
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
