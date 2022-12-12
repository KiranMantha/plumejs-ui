import { NotificationType } from './notification.type';

export class Message {
  content: string;
  type: string;
  index: number;
  autoHide = false;

  constructor(content: string, type: NotificationType = NotificationType.Info, autoHide = false) {
    this.content = content;
    this.type = type || NotificationType.Info;
    this.autoHide = autoHide;
  }
}
