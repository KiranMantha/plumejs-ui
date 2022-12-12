import { NotificationType } from './notification.type';
export declare class Message {
    content: string;
    type: string;
    index: number;
    autoHide: boolean;
    constructor(content: string, type?: NotificationType, autoHide?: boolean);
}
