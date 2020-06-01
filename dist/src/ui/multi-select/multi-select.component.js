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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9tdWx0aS1zZWxlY3QvbXVsdGktc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBc0U7QUFFdEUsMkVBQTREO0FBRTVELHdHQUE4RDtBQUU5RCxNQUFNLDRCQUE0QixHQUFHLEdBQUcsRUFBRTtJQUt6QyxJQUFNLG9CQUFvQixHQUExQixNQUFNLG9CQUFvQjtRQW9CekI7WUFsQkEsdUJBQWtCLEdBQXdCO2dCQUN6QyxJQUFJLEVBQUUsRUFBRTtnQkFDUixZQUFZLEVBQUUsRUFBRTtnQkFDaEIsUUFBUSxFQUFFLENBQUMsY0FBbUIsRUFBRSxFQUFFO29CQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUM3QixDQUFDO2dCQUNELGNBQWMsRUFBRSxFQUFFO2FBQ2xCLENBQUM7WUFHTSxlQUFVLEdBQVksS0FBSyxDQUFDO1lBQzVCLHFCQUFnQixHQUFlLEVBQUUsQ0FBQztZQUVsQyxvQkFBZSxHQUF3QixnQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BELGdCQUFXLEdBQVcsRUFBRSxDQUFDO1lBQ3pCLDhCQUF5QixHQUF3QixnQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBSXJFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsQ0FBQztRQUVELFlBQVksQ0FBQyxRQUE2QixFQUFFLFFBQTZCO1lBQ3hFLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEdBQUcs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