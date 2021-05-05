import { NotificationType } from './notification.type';
export class Message {
    constructor(content, type = NotificationType.Info, autoHide = false) {
        this.autoHide = false;
        this.content = content;
        this.type = type;
        this.autoHide = autoHide;
    }
}
