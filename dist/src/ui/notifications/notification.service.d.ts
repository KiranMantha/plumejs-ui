import { NotificationType } from './notification.type';
export declare class NotificationService {
    private _containerModel;
    sendMessage(content: string, type?: NotificationType, autoHide?: boolean): void;
    private _addChild;
    private _removeChild;
    private _addMessage;
}
