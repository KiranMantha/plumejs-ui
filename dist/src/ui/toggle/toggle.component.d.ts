export interface IToggleInput {
    onchange(checked?: boolean): void;
    onText?: string;
    offText?: string;
    isSelected?: boolean;
}
export declare class ToggleComponent {
    readonly ObservedProperties: readonly ["toggleOptions"];
    toggleOptions: IToggleInput;
    private _id;
    constructor();
    private toggleChange;
    render(): DocumentFragment;
}
