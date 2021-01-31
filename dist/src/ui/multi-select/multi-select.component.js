"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@plumejs/core");
const window_event_observable_1 = require("../../window-event.observable");
const multi_select_component_scss_1 = tslib_1.__importDefault(require("./multi-select.component.scss"));
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
            this._popupContainer = core_1.useRef(null);
            this._searchText = "";
            this._selectItemsListContainer = core_1.useRef(null);
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
            this._windowClickListner = window_event_observable_1.windowClick.subscribe((e) => {
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
                return core_1.html ` <label for="id-${index}" class="select-item">
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
                return core_1.html ` <label for="id-${index}" class="select-item">
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
                return core_1.html `
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
                        return core_1.html `
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
                return core_1.html `<div></div>`;
            }
        }
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], MultiSelectComponent.prototype, "multiSelectOptions", void 0);
    MultiSelectComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "multi-select",
            styles: multi_select_component_scss_1.default,
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], MultiSelectComponent);
};
exports.registerMultiSelectComponent = registerMultiSelectComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9tdWx0aS1zZWxlY3QvbXVsdGktc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBNEU7QUFFNUUsMkVBQTREO0FBRTVELHdHQUE4RDtBQUU5RCxNQUFNLDRCQUE0QixHQUFHLEdBQUcsRUFBRTtJQUt6QyxJQUFNLG9CQUFvQixHQUExQixNQUFNLG9CQUFvQjtRQW9CekI7WUFsQkEsdUJBQWtCLEdBQXdCO2dCQUN6QyxJQUFJLEVBQUUsRUFBRTtnQkFDUixZQUFZLEVBQUUsRUFBRTtnQkFDaEIsUUFBUSxFQUFFLENBQUMsY0FBbUIsRUFBRSxFQUFFO29CQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUM3QixDQUFDO2dCQUNELGNBQWMsRUFBRSxFQUFFO2FBQ2xCLENBQUM7WUFHTSxlQUFVLEdBQVksS0FBSyxDQUFDO1lBQzVCLHFCQUFnQixHQUFlLEVBQUUsQ0FBQztZQUVsQyxvQkFBZSxHQUF3QixhQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEQsZ0JBQVcsR0FBVyxFQUFFLENBQUM7WUFDekIsOEJBQXlCLEdBQXdCLGFBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUlyRSxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFFRCxZQUFZLENBQUMsUUFBNkIsRUFBRSxRQUE2QjtZQUN4RSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFO2dCQUMzQixJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxHQUFHLEVB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