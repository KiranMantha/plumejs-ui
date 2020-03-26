import { IMultiSelectOptions } from './multi-select.interface';
export declare class MultiSelectComponent {
    multiSelectOptions: IMultiSelectOptions;
    private _windowClickListner;
    private _showPopup;
    private _selectedOptions;
    private _buttonText;
    private _popupContainer;
    private _searchText;
    private _selectItemsListContainer;
    update: any;
    constructor();
    mount(): void;
    unmount(): void;
    private _onButtonClickTrigger;
    private _preventLabelClick;
    private _preventInputClick;
    private _clearSelectionIfNotMultiple;
    private _onOptionSelected;
    private _filterList;
    private _filterItems;
    private _buildItem;
    render(): import("lighterhtml").Hole;
}
