import { __decorate } from "tslib";
import { Component, html } from '@plumejs/core';
import toggleStyles from './toggle.component.scss';
let ToggleComponent = class ToggleComponent {
    ObservedProperties = ['toggleOptions'];
    toggleOptions;
    _id = Math.random();
    toggleChange(e) {
        const value = e.target.checked;
        this.toggleOptions.onchange(value);
    }
    render() {
        if (this.toggleOptions) {
            return html ` <div class="toggle-container">
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
            return html `<div></div>`;
        }
    }
};
ToggleComponent = __decorate([
    Component({
        selector: 'toggle-button',
        styles: toggleStyles
    })
], ToggleComponent);
export { ToggleComponent };
