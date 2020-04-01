"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const plumejs_1 = require("plumejs");
const window_event_observable_1 = require("../../window-event.observable");
const registerMultiSelectComponent = () => {
    let MultiSelectComponent = class MultiSelectComponent {
        constructor() {
            this.multiSelectOptions = {
                data: [],
                displayField: '',
                onchange: (selectedOption) => { console.log(selectedOption); }
            };
            this._showPopup = false;
            this._selectedOptions = [];
            this._popupContainer = plumejs_1.useRef(null);
            this._searchText = '';
            this._selectItemsListContainer = plumejs_1.useRef(null);
            this._onButtonClickTrigger = this._onButtonClickTrigger.bind(this);
            this._filterList = this._filterList.bind(this);
        }
        inputChanged(oldValue, newValue) {
            if (!!newValue.resetWidget) {
                this._selectedOptions = [];
                this._buttonText = this.multiSelectOptions.nonSelectedText || 'Select';
            }
        }
        mount() {
            this._windowClickListner = window_event_observable_1.windowClick.subscribe((e) => {
                this._showPopup = false;
                this.update();
            });
            this._buttonText = this.multiSelectOptions.nonSelectedText || 'Select';
        }
        unmount() {
            this._windowClickListner.unsubscribe();
        }
        _onButtonClickTrigger(e) {
            this._showPopup = true;
            this._searchText = '';
            this._filterItems(this._searchText.toLowerCase());
            this.update();
        }
        _preventClickPropagation(e) {
            e.stopPropagation();
        }
        _clearSelectionIfNotMultiple(isMultiple) {
            if (!isMultiple) {
                this._popupContainer.current.querySelectorAll('.active').forEach(i => i.classList.remove('active'));
            }
        }
        _setButtontext(isMultiple, displayField) {
            if (isMultiple) {
                if (!!this.multiSelectOptions.buttonText) {
                    this._buttonText = this.multiSelectOptions.buttonText(this._selectedOptions);
                }
                else {
                    this._buttonText = this._selectedOptions.map((item) => item[displayField]).join(',');
                    if (this._selectedOptions.length === 0)
                        this._buttonText = this.multiSelectOptions.nonSelectedText || 'Select';
                }
            }
            else {
                this._buttonText = this._selectedOptions[0][displayField];
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
            let displayField = this.multiSelectOptions.displayField;
            let isMultiple = !!this.multiSelectOptions.multiple;
            let _selectedValue;
            this._clearSelectionIfNotMultiple(isMultiple);
            if (isInputChecked) {
                target.parentElement.classList.add('active');
                this._setupSelectedOptions(isMultiple, selectedOption);
            }
            else {
                target.parentElement.classList.remove('active');
                this._selectedOptions = this._selectedOptions.filter((item) => {
                    if (item[displayField] !== selectedOption[displayField]) {
                        return item;
                    }
                });
            }
            _selectedValue = isMultiple ? this._selectedOptions : this._selectedOptions[0];
            this._setButtontext(isMultiple, displayField);
            this.multiSelectOptions.onchange(_selectedValue);
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
                        element.classList.remove('hide-item');
                    }
                    else {
                        element.classList.add('hide-item');
                    }
                }
                else {
                    element.classList.remove('hide-item');
                }
            });
        }
        _buildItem(item, index) {
            if (this.multiSelectOptions.multiple) {
                return plumejs_1.html `
                <label for='id-${index}' class='select-item'>
                    <input name='select' id='id-${index}' type='checkbox' onchange=${(e) => { this._onOptionSelected(e, item); }}/>
                    ${item[this.multiSelectOptions.displayField]}
                </label>`;
            }
            else {
                return plumejs_1.html `
                <label for='id-${index}' class='select-item'>
                    <input name='select' id='id-${index}' type='radio' onchange=${(e) => { this._onOptionSelected(e, item); }}/>
                    ${item[this.multiSelectOptions.displayField]}
                </label>`;
            }
        }
        render() {
            if (this.multiSelectOptions.data.length > 0) {
                return plumejs_1.html `
                <div class='multi-select-container' onclick=${this._preventClickPropagation}>
                    <button class='multi-select-trigger' onclick=${this._onButtonClickTrigger} disabled=${!!this.multiSelectOptions.disableDropdown}>
                        ${this._buttonText.translate()}
                    </button>
                    <div ref=${this._popupContainer} class=${`multi-select-popup ${this._showPopup ? 'show-popup' : ''}`}>
                        ${(() => {
                    if (!!this.multiSelectOptions.enableFilter) {
                        return plumejs_1.html `
                                <div class='multi-select-filter'>
                                    <input class='filter-input' type='text' value='${this._searchText}' onkeyup=${this._filterList} />
                                </div>
                            `;
                    }
                })()}
                        <div class='select-items-list' ref=${this._selectItemsListContainer}>
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
            selector: 'multi-select',
            styleUrl: 'multi-select.component.scss'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], MultiSelectComponent);
};
exports.registerMultiSelectComponent = registerMultiSelectComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9tdWx0aS1zZWxlY3QvbXVsdGktc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBc0U7QUFFdEUsMkVBQTREO0FBRzVELE1BQU0sNEJBQTRCLEdBQUcsR0FBRyxFQUFFO0lBS3RDLElBQU0sb0JBQW9CLEdBQTFCLE1BQU0sb0JBQW9CO1FBa0J0QjtZQWZBLHVCQUFrQixHQUF3QjtnQkFDdEMsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLFFBQVEsRUFBRSxDQUFDLGNBQW1CLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RFLENBQUM7WUFHTSxlQUFVLEdBQVksS0FBSyxDQUFDO1lBQzVCLHFCQUFnQixHQUFlLEVBQUUsQ0FBQztZQUVsQyxvQkFBZSxHQUF3QixnQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BELGdCQUFXLEdBQVcsRUFBRSxDQUFDO1lBQ3pCLDhCQUF5QixHQUF3QixnQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBSWxFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUVELFlBQVksQ0FBQyxRQUE0QixFQUFFLFFBQTZCO1lBQ3BFLElBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGtC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