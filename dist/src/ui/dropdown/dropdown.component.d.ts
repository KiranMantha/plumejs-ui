import { Renderer } from '@plumejs/core';
import { IDropdownOptions, IOption } from './dropdown.interface';
export declare class DropdownComponent<T> {
    private renderer;
    static readonly observedProperties: readonly ["dropdownOptions"];
    dropdownOptions: IDropdownOptions<T>;
    private _detailsNode;
    private _summaryNode;
    private _optionsContainerNode;
    private _summaryText;
    private _isMultiSelect;
    private _selectedOptions;
    constructor(renderer: Renderer);
    onPropertiesChanged(): void;
    onOptionSelected(isChecked: boolean, selectedOption: IOption<T>, index: number): void;
    onToggle(): void;
    private getSummaryText;
    private buildItems;
    private filterList;
    private setDropdownPosition;
    private isInViewPort;
    render(): DocumentFragment;
}
