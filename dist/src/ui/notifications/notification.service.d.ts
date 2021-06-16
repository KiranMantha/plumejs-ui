import { NotificationType } from './notification.type';
export declare class NotificationService {
    private _containerModel;
    private _addChild;
    private _removeChild;
    private _addMessage;
    sendMessage(content: string, type?: NotificationType, autoHide?: boolean): void;
}
