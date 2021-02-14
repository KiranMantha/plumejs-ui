import { NotificationType } from './notification.type';
export class Message {
    constructor(content, type = NotificationType.Info, autoHide = false) {
        this.autoHide = false;
        this.content = content;
        this.type = type;
        this.autoHide = autoHide;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9ub3RpZmljYXRpb25zL21lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdkQsTUFBTSxPQUFPLE9BQU87SUFNbkIsWUFBWSxPQUFlLEVBQUUsT0FBZSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsV0FBb0IsS0FBSztRQUY1RixhQUFRLEdBQVksS0FBSyxDQUFDO1FBR3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzFCLENBQUM7Q0FDRCJ9