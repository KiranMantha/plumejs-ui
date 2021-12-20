import { __decorate, __metadata } from "tslib";
import { Component, html, Renderer } from '@plumejs/core';
import toggleStyles from './toggle.component.scss';
const defaultToggleOptions = {
    onText: 'ON',
    offText: 'OFF',
    isSelected: false
};
let ToggleComponent = class ToggleComponent {
    renderer;
    ObservedProperties = ['toggleOptions'];
    toggleOptions = { ...defaultToggleOptions };
    _id = Math.random();
    constructor(renderer) {
        this.renderer = renderer;
    }
    toggleChange(e) {
        const value = e.target.checked;
        this.renderer.emitEvent('togglechange', value);
    }
    render() {
        return html `<div class="toggle-container">
      <span>${this.toggleOptions.offText.translate()}</span>
      <input
        type="checkbox"
        id="${this._id}"
        checked="${!!this.toggleOptions.isSelected}"
        onchange=${(e) => {
            this.toggleChange(e);
        }}
      />
      <label for="${this._id}"></label>
      <span>${this.toggleOptions.onText.translate()}</span>
    </div>`;
    }
};
ToggleComponent = __decorate([
    Component({
        selector: 'ui-toggle-button',
        styles: toggleStyles
    }),
    __metadata("design:paramtypes", [Renderer])
], ToggleComponent);
export { ToggleComponent };
