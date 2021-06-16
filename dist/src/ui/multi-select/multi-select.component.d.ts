import { IHooks } from "@plumejs/core";
export declare class MultiSelectComponent implements IHooks {
    private renderer;
    private multiSelectOptions;
    private _windowClickListner;
    private _selectedOptions;
    private _buttonEle;
    private _buttonText;
    private _popupContainer;
    private _searchText;
    private _selectItemsListContainer;
    constructor();
    onPropsChanged(): void;
    mount(): void;
    unmount(): void;
    private _setButtonTextOnInit;
    private _deselectInputonreset;
    private _onButtonClickTrigger;
    private _preventClickPropagation;
    private _clearSelectionIfNotMultiple;
    private _setButtontext;
    private _setupSelectedOptions;
    private _onOptionSelected;
    private _filterList;
    private _filterItems;
    private _isItemExistsInSelectedValues;
    private _buildItem;
    private _buildItems;
    private _renderFilterInput;
    render(): DocumentFragment;
}
