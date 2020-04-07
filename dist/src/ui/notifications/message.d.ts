export declare class Message {
    content: string;
    type: string;
    index: number;
    dismissed: boolean;
    autoHide: boolean;
    constructor(content: string, type?: string, autoHide?: boolean);
}
