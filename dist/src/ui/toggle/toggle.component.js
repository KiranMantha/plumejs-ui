import { Component, html, Input } from "@plumejs/core";
import toggleStyles from './toggle.component.scss';
const registerToggleComponent = () => {
    class ToggleComponent {
        constructor() {
            this.toggleOptions = {
                onchange: () => { },
                onText: '',
                offText: '',
                isSelected: false
            };
            this._id = Math.random();
            this._showWidget = false;
            this.toggleChange = this.toggleChange.bind(this);
        }
        static get inputProp() {
            return "toggleOptions";
        }
        inputChanged(oldVal, newVal) {
            if (newVal.onchange) {
                this._showWidget = true;
            }
        }
        toggleChange(e) {
            let value = e.target.checked;
            this.toggleOptions.onchange(value);
        }
        render() {
            if (this._showWidget) {
                return html `
                <div class='toggle-container'>
                    <span>${this.toggleOptions.offText ? this.toggleOptions.offText.translate() : ''}</span>
                    <input type='checkbox' id='${this._id}' checked='${!!this.toggleOptions.isSelected}' onchange=${this.toggleChange}/>
                    <label for='${this._id}'></label>
                    <span>${this.toggleOptions.onText ? this.toggleOptions.onText.translate() : ''}</span>
                </div>`;
            }
            else {
                return html `<div></div>`;
            }
        }
    }
    Component({
        selector: 'toggle-button',
        styles: toggleStyles
    })([ToggleComponent]);
};
export { registerToggleComponent };
