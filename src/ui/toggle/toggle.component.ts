import { Component, html } from "@plumejs/core";
import toggleStyles from './toggle.component.scss';

export interface IToggleInput {
    onchange(checked?: boolean): void;
    onText?: string;
    offText?: string;
    isSelected?: boolean;
}

@Component({
    selector: 'toggle-button',
    styles: toggleStyles
})
export class ToggleComponent {
    toggleOptions: IToggleInput;
    private _id = Math.random();

    constructor() {
        this.toggleChange = this.toggleChange.bind(this);
    }

    private toggleChange(e: Event) {
        let value = (e.target as any).checked;
        this.toggleOptions.onchange(value);
    }

    render() {
        if (this.toggleOptions) {
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