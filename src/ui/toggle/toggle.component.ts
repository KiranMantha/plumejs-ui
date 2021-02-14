import { Component, html, IHooks, Input } from "@plumejs/core";
import toggleStyles from './toggle.component.scss';

interface IToggleInput {
    onchange: (checked?: boolean) => void;
    onText?: string;
    offText?: string;
    isSelected?: boolean;
}

const registerToggleComponent = () => {
    @Component({
        selector: 'toggle-button',
        styles: toggleStyles
    })
    class ToggleComponent implements IHooks {
        @Input
        toggleOptions: IToggleInput = {
            onchange: () => { },
            onText: '',
            offText: '',
            isSelected: false
        };

        private _id = Math.random();
        private _showWidget = false;

        constructor() {
            this.toggleChange = this.toggleChange.bind(this);
        }

        inputChanged(oldVal: IToggleInput, newVal: IToggleInput) {
            if (newVal.onchange) {
                this._showWidget = true;
            }
        }

        toggleChange(e: Event) {
            let value = (e.target as any).checked;
            this.toggleOptions.onchange(value);
        }

        render() {
            if (this._showWidget) {
                return html`
                <div class='toggle-container'>
                    <span>${this.toggleOptions.offText ? this.toggleOptions.offText.translate() : ''}</span>
                    <input type='checkbox' id='${this._id}' checked='${!!this.toggleOptions.isSelected}' onchange=${this.toggleChange}/>
                    <label for='${this._id}'></label>
                    <span>${this.toggleOptions.onText ? this.toggleOptions.onText.translate() : ''}</span>
                </div>`;
            } else {
                return html`<div></div>`
            }
        }
    }
}

export { registerToggleComponent, IToggleInput };

