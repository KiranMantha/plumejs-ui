export interface IToggleInput {
    onchange: (checked?: boolean) => void;
    onText?: string;
    offText?: string;
    isSelected?: boolean;
}
export declare class ToggleComponent {
    toggleOptions: IToggleInput;
    private _id;
    constructor();
    toggleChange(e: Event): void;
    render(): import("lighterhtml").Hole;
}
