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
            e.stopPropagation();
            this._showPopup = true;
            this._searchText = '';
            this._filterItems(this._searchText.toLowerCase());
            this.update();
        }
        _preventLabelClick(e) {
            e.stopPropagation();
        }
        _preventInputClick(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        _clearSelectionIfNotMultiple(isMultiple) {
            if (!isMultiple) {
                this._popupContainer.current.querySelectorAll('.active').forEach(i => i.classList.remove('active'));
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
                this._selectedOptions.push(selectedOption);
            }
            else {
                target.parentElement.classList.remove('active');
                this._selectedOptions = this._selectedOptions.filter((item) => {
                    if (item[displayField] !== selectedOption[displayField]) {
                        return item;
                    }
                });
            }
            if (isMultiple) {
                if (!!this.multiSelectOptions.buttonText) {
                    this._buttonText = this.multiSelectOptions.buttonText(this._selectedOptions);
                }
                else {
                    this._buttonText = this._selectedOptions.map((item) => item[displayField]).join(',');
                    if (this._selectedOptions.length === 0)
                        this._buttonText = this.multiSelectOptions.nonSelectedText || 'Select';
                }
                _selectedValue = this._selectedOptions;
            }
            else {
                this._buttonText = selectedOption[displayField];
                _selectedValue = selectedOption;
            }
            this.multiSelectOptions.onchange(_selectedValue);
            this.update();
        }
        _filterList(e) {
            this._searchText = e.target.value;
            this._filterItems(this._searchText.toLowerCase());
            this.update();
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
        _buildItem(item) {
            let id = Math.random();
            if (this.multiSelectOptions.multiple) {
                return plumejs_1.html `
            <label for='${id}' class='select-item' onclick=${this._preventLabelClick}>
                <input name='select' id='${id}' type='checkbox' onchange=${(e) => { this._onOptionSelected(e, item); }}/>
                ${item[this.multiSelectOptions.displayField]}
            </label>`;
            }
            else {
                return plumejs_1.html `
            <label for='${id}' class='select-item' onclick=${this._preventLabelClick}>
                <input name='select' id='${id}' type='radio' onchange=${(e) => { this._onOptionSelected(e, item); }}/>
                ${item[this.multiSelectOptions.displayField]}
            </label>`;
            }
        }
        render() {
            if (this.multiSelectOptions.data.length > 0) {
                return plumejs_1.html `
                <div class='multi-select-container'>
                    <button class='multi-select-trigger' onclick=${this._onButtonClickTrigger} disabled=${!!this.multiSelectOptions.disableDropdown}>
                        ${this._buttonText.translate()}
                    </button>
                    <div ref=${this._popupContainer} class=${`multi-select-popup ${this._showPopup ? 'show-popup' : ''}`}>
                        ${(() => {
                    if (!!this.multiSelectOptions.enableFilter) {
                        return plumejs_1.html `
                                        <div class='multi-select-filter'>
                                            <input class='filter-input' type='text' value='${this._searchText}' onclick=${this._preventInputClick} onkeyup=${this._filterList} />
                                        </div>
                                    `;
                    }
                })()}
                        <div class='select-items-list' ref=${this._selectItemsListContainer}>
                            ${this.multiSelectOptions.data.map((item) => {
                    return this._buildItem(item);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9tdWx0aS1zZWxlY3QvbXVsdGktc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBOEQ7QUFFOUQsMkVBQTREO0FBRzVELE1BQU0sNEJBQTRCLEdBQUcsR0FBRyxFQUFFO0lBS3RDLElBQU0sb0JBQW9CLEdBQTFCLE1BQU0sb0JBQW9CO1FBa0J0QjtZQWZBLHVCQUFrQixHQUF3QjtnQkFDdEMsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLFFBQVEsRUFBRSxDQUFDLGNBQW1CLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RFLENBQUM7WUFHTSxlQUFVLEdBQVksS0FBSyxDQUFDO1lBQzVCLHFCQUFnQixHQUFlLEVBQUUsQ0FBQztZQUVsQyxvQkFBZSxHQUF3QixnQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BELGdCQUFXLEdBQVcsRUFBRSxDQUFDO1lBQ3pCLDhCQUF5QixHQUF3QixnQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBSWxFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUVELEtBQUs7WUFDRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcscUNBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFRLEVBQUUsRUFBRTtnQkFDMUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNs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