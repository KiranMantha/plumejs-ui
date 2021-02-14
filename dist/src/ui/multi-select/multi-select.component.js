import { __decorate, __metadata } from "tslib";
import { Component, html, Input, useRef } from "@plumejs/core";
import { windowClick } from "../../window-event.observable";
import multiselectStyles from "./multi-select.component.scss";
const registerMultiSelectComponent = () => {
    let MultiSelectComponent = class MultiSelectComponent {
        constructor() {
            this.multiSelectOptions = {
                data: [],
                displayField: "",
                onchange: (selectedOption) => {
                    console.log(selectedOption);
                },
                selectedValues: [],
            };
            this._showPopup = false;
            this._selectedOptions = [];
            this._popupContainer = useRef(null);
            this._searchText = "";
            this._selectItemsListContainer = useRef(null);
            this._onButtonClickTrigger = this._onButtonClickTrigger.bind(this);
            this._filterList = this._filterList.bind(this);
        }
        inputChanged(oldValue, newValue) {
            if (!!newValue.resetWidget) {
                this.multiSelectOptions.selectedValues = [];
                this._selectedOptions = [];
                this._buttonText = this.multiSelectOptions.nonSelectedText || "Select";
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
                this._showPopup = false;
                this.update();
            });
            this._buttonText = this.multiSelectOptions.nonSelectedText || "Select";
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
            this._selectItemsListContainer.current
                .querySelectorAll(".active")
                .forEach((i) => {
                i.classList.remove("active");
                i.querySelector("input").checked = false;
            });
        }
        _onButtonClickTrigger(e) {
            this._showPopup = true;
            this._searchText = "";
            this._filterItems(this._searchText.toLowerCase());
            this.update();
        }
        _preventClickPropagation(e) {
            e.stopPropagation();
        }
        _clearSelectionIfNotMultiple(isMultiple) {
            if (!isMultiple) {
                this._popupContainer.current
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
                    if (this._selectedOptions.length === 0)
                        this._buttonText =
                            this.multiSelectOptions.nonSelectedText || "Select";
                }
            }
            else {
                this._buttonText =
                    displayField !== ""
                        ? this._selectedOptions[0][displayField]
                        : this._selectedOptions[0];
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
            if (!isMultiple)
                this._showPopup = false;
            this.update();
        }
        _filterList(e) {
            this._searchText = e.target.value;
            this._filterItems(this._searchText.toLowerCase());
        }
        _filterItems(filterText) {
            Array.from(this._selectItemsListContainer.current.children).forEach((element) => {
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
        render() {
            if (this.multiSelectOptions.data.length > 0) {
                return html `
					<div
						class="multi-select-container"
						onclick=${this._preventClickPropagation}
					>
						<button
							class="multi-select-trigger"
							onclick=${this._onButtonClickTrigger}
							disabled=${!!this.multiSelectOptions.disableDropdown}
						>
							${this._buttonText.translate()}
						</button>
						<div
							ref=${this._popupContainer}
							class=${`multi-select-popup ${this._showPopup ? "show-popup" : ""}`}
						>
							${(() => {
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
                })()}
							<div
								class="select-items-list"
								ref=${this._selectItemsListContainer}
							>
								${this.multiSelectOptions.data.map((item, index) => {
                    return this._buildItem(item, index);
                })}
							</div>
						</div>
					</div>
				`;
            }
            else {
                return html `<div></div>`;
            }
        }
    };
    __decorate([
        Input,
        __metadata("design:type", Object)
    ], MultiSelectComponent.prototype, "multiSelectOptions", void 0);
    MultiSelectComponent = __decorate([
        Component({
            selector: "multi-select",
            styles: multiselectStyles,
        }),
        __metadata("design:paramtypes", [])
    ], MultiSelectComponent);
};
export { registerMultiSelectComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9tdWx0aS1zZWxlY3QvbXVsdGktc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQVUsS0FBSyxFQUFPLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU1RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxpQkFBaUIsTUFBTSwrQkFBK0IsQ0FBQztBQUc5RCxNQUFNLDRCQUE0QixHQUFHLEdBQUcsRUFBRTtJQUt6QyxJQUFNLG9CQUFvQixHQUExQixNQUFNLG9CQUFvQjtRQW9CekI7WUFsQkEsdUJBQWtCLEdBQXdCO2dCQUN6QyxJQUFJLEVBQUUsRUFBRTtnQkFDUixZQUFZLEVBQUUsRUFBRTtnQkFDaEIsUUFBUSxFQUFFLENBQUMsY0FBbUIsRUFBRSxFQUFFO29CQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUM3QixDQUFDO2dCQUNELGNBQWMsRUFBRSxFQUFFO2FBQ2xCLENBQUM7WUFHTSxlQUFVLEdBQVksS0FBSyxDQUFDO1lBQzVCLHFCQUFnQixHQUFlLEVBQUUsQ0FBQztZQUVsQyxvQkFBZSxHQUF3QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEQsZ0JBQVcsR0FBVyxFQUFFLENBQUM7WUFDekIsOEJBQXlCLEdBQXdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUlyRSxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFFRCxZ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