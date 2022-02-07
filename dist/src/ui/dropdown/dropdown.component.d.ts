import { Renderer } from '@plumejs/core';
import { IDropdownOptions, IOption } from './dropdown.interface';
export declare class DropdownComponent<T> {
    private renderer;
    readonly ObservedProperties: readonly ["dropdownOptions"];
    dropdownOptions: IDropdownOptions<T>;
    private _detailsNode;
    private _summaryNode;
    private _optionsContainerNode;
    private _summaryText;
    private _isMultiSelect;
    private _selectedOptions;
    constructor(renderer: Renderer);
    onPropsChanged(): void;
    onOptionSelected(isChecked: boolean, selectedOption: IOption<T>, index: number): void;
    _getSummaryText(): void;
    _buildItems(): DocumentFragment[];
    _filterList(filterText: string): void;
    render(): DocumentFragment;
}
