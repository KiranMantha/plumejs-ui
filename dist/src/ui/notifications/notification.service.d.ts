import { NotificationType } from './notification.type';
export declare class NotificationService {
    constructor();
    private _containerModel;
    private _addChild;
    private _removeChild;
    private _addMessage;
    sendMessage(content: string, type?: NotificationType): void;
}
