"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUIComponents = void 0;
const tslib_1 = require("tslib");
const registerUIComponents = () => {
    Promise.resolve().then(() => (0, tslib_1.__importStar)(require('./ui/modal/modal-component/modal.component')));
    Promise.resolve().then(() => (0, tslib_1.__importStar)(require('./ui/multi-select/multi-select.component')));
    Promise.resolve().then(() => (0, tslib_1.__importStar)(require('./ui/notifications/notification-container.component')));
    Promise.resolve().then(() => (0, tslib_1.__importStar)(require('./ui/notifications/notification.component')));
    Promise.resolve().then(() => (0, tslib_1.__importStar)(require('./ui/toggle/toggle.component')));
};
exports.registerUIComponents = registerUIComponents;
(0, tslib_1.__exportStar)(require("./ui/modal"), exports);
(0, tslib_1.__exportStar)(require("./ui/multi-select"), exports);
(0, tslib_1.__exportStar)(require("./ui/notifications"), exports);
(0, tslib_1.__exportStar)(require("./ui/toggle"), exports);
