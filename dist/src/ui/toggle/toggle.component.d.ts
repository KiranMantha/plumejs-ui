import { IHooks, Renderer } from '@plumejs/core';
export interface IToggleInput {
    onText?: string;
    offText?: string;
    isSelected?: boolean;
}
export declare class ToggleComponent implements IHooks {
    private renderer;
    static readonly observedProperties: readonly ["toggleOptions"];
    toggleOptions: IToggleInput;
    private _id;
    constructor(renderer: Renderer);
    onPropertiesChanged(): void;
    private toggleChange;
    render(): DocumentFragment;
}
