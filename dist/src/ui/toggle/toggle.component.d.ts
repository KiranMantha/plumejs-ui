import { IHooks } from '@plumejs/core';
export interface IToggleInput {
    onchange(checked?: boolean): void;
    onText?: string;
    offText?: string;
    isSelected?: boolean;
}
export declare class ToggleComponent implements IHooks {
    readonly ObservedProperties: readonly ["toggleOptions"];
    toggleOptions: IToggleInput;
    private _id;
    constructor();
    private toggleChange;
    render(): DocumentFragment;
}
