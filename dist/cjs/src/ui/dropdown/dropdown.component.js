"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@plumejs/core");
const dropdown_component_scss_1 = (0, tslib_1.__importDefault)(require("./dropdown.component.scss"));
const defaultDropdownOptions = {
    options: [],
    multiple: false,
    defaultText: 'Select',
    buttonText: null,
    enableFilter: false
};
let DropdownComponent = class DropdownComponent {
    constructor(renderer) {
        this.renderer = renderer;
        this.ObservedProperties = ['dropdownOptions'];
        this.dropdownOptions = Object.assign({}, defaultDropdownOptions);
        this._isMultiSelect = false;
        this._selectedOptions = [];
    }
    onPropsChanged() {
        if (this.dropdownOptions.options.length) {
            this.dropdownOptions = Object.assign(Object.assign({}, defaultDropdownOptions), this.dropdownOptions);
            const { multiple } = this.dropdownOptions;
            this._isMultiSelect = multiple;
            this._getSummaryText();
        }
    }
    onOptionSelected(isChecked, selectedOption, index) {
        let selectedText = '';
        if (!this._isMultiSelect) {
            selectedText = selectedOption.label;
            this._detailsNode.removeAttribute('open');
        }
        else {
            this.dropdownOptions.options[index].selected = isChecked;
            this._selectedOptions = this.dropdownOptions.options.filter((item) => !!item.selected);
            if (this.dropdownOptions.buttonText) {
                selectedText = this.dropdownOptions.buttonText(this._selectedOptions);
            }
            else if (this._selectedOptions.length) {
                selectedText = this._selectedOptions.map((item) => item.label).join(', ');
            }
            else {
                selectedText = this.dropdownOptions.defaultText;
            }
        }
        this._summaryNode.textContent = selectedText;
        this.renderer.emitEvent('optionselected', {
            option: !this._isMultiSelect ? selectedOption : this._selectedOptions
        });
    }
    _getSummaryText() {
        this._selectedOptions = this.dropdownOptions.options.filter((item) => !!item.selected);
        if (this._isMultiSelect) {
            this._summaryText = this._selectedOptions.map((item) => item.label).join(',') || this.dropdownOptions.defaultText;
        }
        else {
            if (this._selectedOptions.length) {
                this._summaryText = this._selectedOptions[0].label;
            }
            else {
                this.dropdownOptions.options[0].selected = true;
                this._summaryText = this.dropdownOptions.options[0].label;
            }
        }
    }
    _buildItems() {
        const items = this.dropdownOptions.options.map((item, index) => {
            return (0, core_1.html) `
        <li>
          <input
            name="select"
            id="id-${index}"
            type="${this._isMultiSelect ? 'checkbox' : 'radio'}"
            checked=${!!item.selected}
            onchange=${(e) => {
                this.onOptionSelected(e.target.checked, item, index);
            }}
          />
          <label for="id-${index}"> ${item.label} </label>
        </li>
      `;
        });
        if (this.dropdownOptions.enableFilter) {
            const filterNode = (0, core_1.html) ` <li class="filter">
        <input
          type="search"
          oninput=${(e) => {
                this._filterList(e.target.value);
            }}
        />
      </li>`;
            items.unshift(filterNode);
        }
        return items;
    }
    _filterList(filterText) {
        const labels = this._optionsContainerNode.querySelectorAll('label');
        Array.from(labels).forEach((element) => {
            const itemText = element.textContent || element.innerText;
            if (filterText) {
                if (itemText.toLowerCase().indexOf(filterText) !== -1) {
                    element.parentElement.classList.remove('hide-item');
                }
                else {
                    element.parentElement.classList.add('hide-item');
                }
            }
            else {
                element.parentElement.classList.remove('hide-item');
            }
        });
    }
    render() {
        if (this.dropdownOptions.options.length) {
            return (0, core_1.html) `
        <details
          class="dropdown-component"
          ref=${(node) => {
                this._detailsNode = node;
            }}
        >
          <summary>
            <div
              ref=${(node) => {
                this._summaryNode = node;
            }}
            >
              ${this._summaryText}
            </div>
          </summary>
          <div class="relative">
            <div class="dropdown-menu">
              <ul
                ref=${(node) => {
                this._optionsContainerNode = node;
            }}
              >
                ${this._buildItems()}
              </ul>
            </div>
          </div>
        </details>
      `;
        }
        else {
            return (0, core_1.html) `<div></div>`;
        }
    }
};
DropdownComponent = (0, tslib_1.__decorate)([
    (0, core_1.Component)({
        selector: 'app-dropdown',
        styles: dropdown_component_scss_1.default
    }),
    (0, tslib_1.__metadata)("design:paramtypes", [core_1.Renderer])
], DropdownComponent);
exports.DropdownComponent = DropdownComponent;
