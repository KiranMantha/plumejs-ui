import { Component, html } from "@plumejs/core";
import { windowClick } from "../../window-event.observable";
import multiselectStyles from "./multi-select.component.scss";
export class MultiSelectComponent {
    constructor() {
        this._selectedOptions = [];
        this._searchText = "";
        this._onButtonClickTrigger = this._onButtonClickTrigger.bind(this);
        this._filterList = this._filterList.bind(this);
    }
    onPropsChanged() {
        if (!!this.multiSelectOptions.resetWidget) {
            this.multiSelectOptions.selectedValues = [];
            this._selectedOptions = [];
            this._buttonEle.textContent = this.multiSelectOptions.nonSelectedText || "Select";
            this._deselectInputonreset();
        }
        this.multiSelectOptions.selectedValues = this.multiSelectOptions
            .selectedValues
            ? this.multiSelectOptions.selectedValues
            : [];
        this._selectedOptions = this.multiSelectOptions.selectedValues;
        this._setButtonTextOnInit(this.multiSelectOptions.multiple);
    }
    mount() {
        this._windowClickListner = windowClick.subscribe((e) => {
            this._popupContainer.classList.remove('show-popup');
        });
    }
    unmount() {
        this._windowClickListner.unsubscribe();
    }
    _setButtonTextOnInit(isMultiple) {
        if (this._selectedOptions.length > 0) {
            let arrayType = typeof this._selectedOptions[0];
            let displayField = arrayType === "string" ? "" : this.multiSelectOptions.displayField;
            this._setButtontext(isMultiple, displayField);
        }
    }
    _deselectInputonreset() {
        this._selectItemsListContainer
            .querySelectorAll(".active")
            .forEach((i) => {
            i.classList.remove("active");
            i.querySelector("input").checked = false;
        });
    }
    _onButtonClickTrigger(e) {
        this._searchText = "";
        this._filterItems(this._searchText.toLowerCase());
        this._popupContainer.classList.toggle('show-popup');
    }
    _preventClickPropagation(e) {
        e.stopPropagation();
    }
    _clearSelectionIfNotMultiple(isMultiple) {
        if (!isMultiple) {
            this._popupContainer
                .querySelectorAll(".active")
                .forEach((i) => i.classList.remove("active"));
        }
    }
    _setButtontext(isMultiple, displayField) {
        if (isMultiple) {
            if (!!this.multiSelectOptions.buttonText) {
                this._buttonText = this.multiSelectOptions.buttonText(this._selectedOptions);
            }
            else {
                this._buttonText =
                    displayField !== ""
                        ? this._selectedOptions
                            .map((item) => item[displayField])
                            .join(",")
                        : this._selectedOptions.join(",");
                if (this._selectedOptions.length === 0) {
                    this._buttonText = this.multiSelectOptions.nonSelectedText || "Select";
                }
            }
        }
        else {
            this._buttonText =
                displayField !== ""
                    ? this._selectedOptions[0][displayField]
                    : this._selectedOptions[0];
        }
        if (this._buttonEle) {
            this._buttonEle.textContent = this._buttonText.translate();
        }
    }
    _setupSelectedOptions(isMultiple, selectedOption) {
        if (isMultiple) {
            this._selectedOptions.push(selectedOption);
        }
        else {
            this._selectedOptions = [selectedOption];
        }
    }
    _onOptionSelected(e, selectedOption) {
        let target = e.target;
        let isInputChecked = target.checked;
        let displayField = this.multiSelectOptions.displayField || "";
        let isMultiple = !!this.multiSelectOptions.multiple;
        let _selectedValue;
        this._clearSelectionIfNotMultiple(isMultiple);
        if (isInputChecked) {
            target.parentElement.classList.add("active");
            this._setupSelectedOptions(isMultiple, selectedOption);
        }
        else {
            target.parentElement.classList.remove("active");
            this._selectedOptions = this._selectedOptions.filter((item) => {
                if (item[displayField] !== selectedOption[displayField]) {
                    return item;
                }
            });
        }
        _selectedValue = isMultiple
            ? this._selectedOptions
            : this._selectedOptions[0];
        this._setButtontext(isMultiple, displayField);
        this.multiSelectOptions.onchange(_selectedValue);
        if (!isMultiple) {
            this._popupContainer.classList.remove('show-popup');
        }
    }
    _filterList(e) {
        this._searchText = e.target.value;
        this._filterItems(this._searchText.toLowerCase());
    }
    _filterItems(filterText) {
        Array.from(this._selectItemsListContainer.children).forEach((element) => {
            let itemText = element.textContent || element.innerText;
            if (filterText) {
                if (itemText.toLowerCase().indexOf(filterText) !== -1) {
                    element.classList.remove("hide-item");
                }
                else {
                    element.classList.add("hide-item");
                }
            }
            else {
                element.classList.remove("hide-item");
            }
        });
    }
    _isItemExistsInSelectedValues(item, isMultiple) {
        let index = -1;
        if (this.multiSelectOptions.selectedValues.length > 0) {
            if (typeof item === "string") {
                index = isMultiple
                    ? this.multiSelectOptions.selectedValues.indexOf(item)
                    : [this.multiSelectOptions.selectedValues[0]].indexOf(item);
            }
            else {
                let _displayField = this.multiSelectOptions.displayField;
                index = isMultiple
                    ? this.multiSelectOptions.selectedValues
                        .map((item) => item[_displayField])
                        .indexOf(item[_displayField])
                    : [this.multiSelectOptions.selectedValues[0]]
                        .map((item) => item[_displayField])
                        .indexOf(item[_displayField]);
            }
        }
        return index > -1 ? true : false;
    }
    _buildItem(item, index) {
        let isMultiple = this.multiSelectOptions.multiple;
        let checked = this._isItemExistsInSelectedValues(item, isMultiple);
        let itemType = typeof item;
        if (isMultiple) {
            return html ` <label for="id-${index}" class="select-item">
				<input
					name="select"
					id="id-${index}"
					type="checkbox"
					checked=${checked}
					onchange=${(e) => {
                this._onOptionSelected(e, item);
            }}
				/>
				${itemType !== "string"
                ? item[this.multiSelectOptions.displayField]
                : item}
			</label>`;
        }
        else {
            return html ` <label for="id-${index}" class="select-item">
				<input
					name="select"
					id="id-${index}"
					type="radio"
					checked=${checked}
					onchange=${(e) => {
                this._onOptionSelected(e, item);
            }}
				/>
				${itemType !== "string"
                ? item[this.multiSelectOptions.displayField]
                : item}
			</label>`;
        }
    }
    _buildItems() {
        return this.multiSelectOptions.data.map((item, index) => {
            return this._buildItem(item, index);
        });
    }
    _renderFilterInput() {
        if (!!this.multiSelectOptions.enableFilter) {
            return html `
			<div class="multi-select-filter">
				<input
					class="filter-input"
					type="text"
					value="${this._searchText}"
					onkeyup=${this._filterList}
				/>
			</div>
		`;
        }
        else {
            return html ``;
        }
    }
    render() {
        if (this.multiSelectOptions && this.multiSelectOptions.data.length > 0) {
            return html `
				<div
					class="multi-select-container"
					onclick=${this._preventClickPropagation}
				>
					<button
						ref=${(node) => { this._buttonEle = node; }}
						class="multi-select-trigger"
						onclick=${this._onButtonClickTrigger}
						disabled=${!!this.multiSelectOptions.disableDropdown}
					>
						${this._buttonText.translate()}
					</button>
					<div
						ref=${(node) => { this._popupContainer = node; }}
						class="multi-select-popup"
					>
						${this._renderFilterInput()}
						<div
							class="select-items-list"
							ref=${(node) => { this._selectItemsListContainer = node; }}
						>
							${this._buildItems()}
						</div>
					</div>
				</div>
			`;
        }
        else {
            return html `<div></div>`;
        }
    }
}
Component({
	selector: "multi-select",
	styles: multiselectStyles,
})([MultiSelectComponent]);
