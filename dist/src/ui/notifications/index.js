const registerUINotifications = () => {
    return import('./notification-container.component'), import('./notification.component');
};
export { NotificationService } from './notification.service';
export { NotificationType } from './notification.type';
export { registerUINotifications };
