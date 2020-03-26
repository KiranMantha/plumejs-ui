"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const plumejs_1 = require("plumejs");
const window_event_observable_1 = require("../../window-event.observable");
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
exports.MultiSelectComponent = MultiSelectComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91aS9tdWx0aS1zZWxlY3QvbXVsdGktc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBOEQ7QUFFOUQsMkVBQTREO0FBTzVELElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBa0I3QjtRQWZBLHVCQUFrQixHQUF3QjtZQUN0QyxJQUFJLEVBQUUsRUFBRTtZQUNSLFlBQVksRUFBRSxFQUFFO1lBQ3RCLFFBQVEsRUFBRSxDQUFDLGNBQW1CLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hFLENBQUM7UUFHTSxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLHFCQUFnQixHQUFjLEVBQUUsQ0FBQztRQUVqQyxvQkFBZSxHQUF1QixnQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLDhCQUF5QixHQUF1QixnQkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBSWpFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcscUNBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFPLEVBQUUsRUFBRTtZQUN6RCxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsV0FBVyxH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