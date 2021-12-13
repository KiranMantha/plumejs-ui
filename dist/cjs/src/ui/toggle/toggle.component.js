"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@plumejs/core");
const toggle_component_scss_1 = (0, tslib_1.__importDefault)(require("./toggle.component.scss"));
let ToggleComponent = class ToggleComponent {
    constructor() {
        this.ObservedProperties = ['toggleOptions'];
        this._id = Math.random();
    }
    toggleChange(e) {
        const value = e.target.checked;
        this.toggleOptions.onchange(value);
    }
    render() {
        if (this.toggleOptions) {
            return (0, core_1.html) ` <div class="toggle-container">
        <span>${this.toggleOptions.offText ? this.toggleOptions.offText.translate() : ''}</span>
        <input
          type="checkbox"
          id="${this._id}"
          checked="${!!this.toggleOptions.isSelected}"
          onchange=${(e) => {
                this.toggleChange(e);
            }}
        />
        <label for="${this._id}"></label>
        <span>${this.toggleOptions.onText ? this.toggleOptions.onText.translate() : ''}</span>
      </div>`;
        }
        else {
            return (0, core_1.html) `<div></div>`;
        }
    }
};
ToggleComponent = (0, tslib_1.__decorate)([
    (0, core_1.Component)({
        selector: 'toggle-button',
        styles: toggle_component_scss_1.default
    })
], ToggleComponent);
exports.ToggleComponent = ToggleComponent;
