"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUINotifications = exports.NotificationType = exports.NotificationService = void 0;
const registerUINotifications = () => {
    return Promise.resolve().then(() => __importStar(require('./notification-container.component'))), Promise.resolve().then(() => __importStar(require('./notification.component')));
};
exports.registerUINotifications = registerUINotifications;
var notification_service_1 = require("./notification.service");
Object.defineProperty(exports, "NotificationService", { enumerable: true, get: function () { return notification_service_1.NotificationService; } });
var notification_type_1 = require("./notification.type");
Object.defineProperty(exports, "NotificationType", { enumerable: true, get: function () { return notification_type_1.NotificationType; } });
