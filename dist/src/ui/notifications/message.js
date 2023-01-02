import { NotificationType } from './notification.type';
export class Message {
    content;
    type;
    index;
    autoHide = false;
    constructor(content, type = NotificationType.Info, autoHide = false) {
        this.content = content;
        this.type = type || NotificationType.Info;
        this.autoHide = autoHide;
    }
}
