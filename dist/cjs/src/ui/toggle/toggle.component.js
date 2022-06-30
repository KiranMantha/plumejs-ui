"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@plumejs/core");
const toggle_component_scss_1 = tslib_1.__importDefault(require("./toggle.component.scss"));
const defaultToggleOptions = {
    onText: 'ON',
    offText: 'OFF',
    isSelected: false
};
let ToggleComponent = class ToggleComponent {
    constructor(renderer) {
        this.renderer = renderer;
        this.ObservedProperties = ['toggleOptions'];
        this.toggleOptions = Object.assign({}, defaultToggleOptions);
        this._id = Math.random();
    }
    toggleChange(e) {
        const value = e.target.checked;
        this.renderer.emitEvent('togglechange', value);
    }
    render() {
        return (0, core_1.html) `<div class="toggle-container" part="toggle-container">
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
ToggleComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'ui-toggle-button',
        standalone: true,
        styles: toggle_component_scss_1.default,
        deps: [core_1.Renderer]
    }),
    tslib_1.__metadata("design:paramtypes", [core_1.Renderer])
], ToggleComponent);
exports.ToggleComponent = ToggleComponent;
