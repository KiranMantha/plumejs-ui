"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const plumejs_1 = require("plumejs");
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
            this._popupContainer = plumejs_1.useRef(null);
            this._searchText = "";
            this._selectItemsListContainer = plumejs_1.useRef(null);
            this._onButtonClickTrigger = this._onButtonClickTrigger.bind(this);
            this._filterList = this._filterList.bind(this);
        }
        inputChanged(oldValue, newValue) {
            this.multiSelectOptions.selectedValues = this.multiSelectOptions
                .selectedValues
                ? this.multiSelectOptions.selectedValues
                : [];
            this._selectedOptions = this.multiSelectOptions.selectedValues;
            this._setButtonTextOnInit(this.multiSelectOptions.multiple);
            if (!!newValue.resetWidget) {
                this._selectedOptions = [];
                this._buttonText = this.multiSelectOptions.nonSelectedText || "Select";
                this._deselectInputonreset();
            }
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
                return plumejs_1.html ` <label for="id-${index}" class="select-item">
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
                return plumejs_1.html ` <label for="id-${index}" class="select-item">
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
                return plumejs_1.html `
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
                        return plumejs_1.html `
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
                return plumejs_1.html `<div></div>`;
            }
        }
    };
    tslib_1.__decorate([
        plumejs_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], MultiSelectComponent.prototype, "multiSelectOptions", void 0);
    MultiSelectComponent = tslib_1.__decorate([
        plumejs_1.Component({
            selector: "multi-select",
            styles: multi_select_component_scss_1.default,
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], MultiSelectComponent);
};
exports.registerMultiSelectComponent = registerMultiSelectComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9tdWx0aS1zZWxlY3QvbXVsdGktc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBc0U7QUFFdEUsMkVBQTREO0FBRTVELHdHQUE4RDtBQUU5RCxNQUFNLDRCQUE0QixHQUFHLEdBQUcsRUFBRTtJQUt6QyxJQUFNLG9CQUFvQixHQUExQixNQUFNLG9CQUFvQjtRQW9CekI7WUFsQkEsdUJBQWtCLEdBQXdCO2dCQUN6QyxJQUFJLEVBQUUsRUFBRTtnQkFDUixZQUFZLEVBQUUsRUFBRTtnQkFDaEIsUUFBUSxFQUFFLENBQUMsY0FBbUIsRUFBRSxFQUFFO29CQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUM3QixDQUFDO2dCQUNELGNBQWMsRUFBRSxFQUFFO2FBQ2xCLENBQUM7WUFHTSxlQUFVLEdBQVksS0FBSyxDQUFDO1lBQzVCLHFCQUFnQixHQUFlLEVBQUUsQ0FBQztZQUVsQyxvQkFBZSxHQUF3QixnQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BELGdCQUFXLEdBQVcsRUFBRSxDQUFDO1lBQ3pCLDhCQUF5QixHQUF3QixnQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBSXJFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUVELFlBQVksQ0FBQyxRQUE2QixFQUFFLFFBQTZCO1lBQ3hFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGtCQUFrQjtpQkFDOUQsY0FBYztnQkFDZixDQUFDLENB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