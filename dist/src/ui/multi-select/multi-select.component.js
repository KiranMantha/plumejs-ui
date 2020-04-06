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
                this._deselectInputonreset();
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
        _deselectInputonreset() {
            this._selectItemsListContainer.current.querySelectorAll('.active').forEach(i => {
                i.classList.remove('active');
                i.querySelector('input').checked = false;
            });
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