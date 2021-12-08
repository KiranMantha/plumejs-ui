const registerUIComponents = () => {
  import('./ui/modal/modal-component/modal.component');
  import('./ui/multi-select/multi-select.component');
  import('./ui/notifications/notification-container.component');
  import('./ui/notifications/notification.component');
  import('./ui/toggle/toggle.component');
};
export { registerUIComponents };
export * from './ui/modal';
export * from './ui/multi-select';
export * from './ui/notifications';
export * from './ui/toggle';
