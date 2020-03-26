import { Component, html, Input } from "plumejs";

interface IToggleInput {
    onchange: (checked?: boolean) => void;
    onText?: string;
    offText?: string;
    isSelected?: boolean;
}

const registerToggleComponent = () => {
    @Component({
        selector: 'toggle-button',
        styleUrl: 'toggle.component.scss'
    })
    class ToggleComponent {
        @Input()
        toggleOptions: IToggleInput = {
            onchange: () => { },
            onText: '',
            offText: '',
            isSelected: false
        };

        private _id = Math.random();

        constructor() {
            this.toggleChange = this.toggleChange.bind(this);
        }

        toggleChange(e: Event) {
            let value = (e.target as any).checked;
            this.toggleOptions.onchange(value);
        }

        render() {
            if (this.toggleOptions.onchange) {
                return html`
                <div class='toggle-container'>
                    <span>${ this.toggleOptions.offText ? this.toggleOptions.offText.translate() : ''}</span>
                    <input type='checkbox' id='${ this._id}' checked='${!!this.toggleOptions.isSelected}' onchange=${this.toggleChange}/>
                    <label for='${this._id}'></label>
                    <span>${ this.toggleOptions.onText ? this.toggleOptions.onText.translate() : ''}</span>
                </div>`;
            } else {
                return html`<div></div>`
            }
        }
    }
}

export { registerToggleComponent, IToggleInput };