"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notification_type_1 = require("./notification.type");
class Message {
    constructor(content, type = notification_type_1.NotificationType.Info, autoHide = false) {
        this.autoHide = false;
        this.content = content;
        this.type = type;
        this.autoHide = autoHide;
    }
}
exports.Message = Message;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9ub3RpZmljYXRpb25zL21lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyREFBdUQ7QUFFdkQsTUFBYSxPQUFPO0lBTW5CLFlBQVksT0FBZSxFQUFFLE9BQWUsb0NBQWdCLENBQUMsSUFBSSxFQUFFLFdBQW9CLEtBQUs7UUFGNUYsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUd6QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMxQixDQUFDO0NBQ0Q7QUFYRCwwQkFXQyJ9