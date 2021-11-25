import { Message } from './message';
export declare enum NotificationType {
    Info = "info",
    Danger = "danger"
}
export interface INotification {
    message: Message;
    dismiss: (index: number) => void;
}
