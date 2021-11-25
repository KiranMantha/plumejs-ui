import { IHooks, Renderer } from '@plumejs/core';
import { INotification } from './notification.type';
export declare class NotificationMessage implements IHooks {
    private renderer;
    readonly ObservedProperties: readonly ["notification"];
    notification: INotification;
    constructor(renderer: Renderer);
    mount(): void;
    onDismiss(e: Event): void;
    render(): DocumentFragment;
}
