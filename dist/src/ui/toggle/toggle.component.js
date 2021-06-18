import { Component, html } from '@plumejs/core';
import toggleStyles from './toggle.component.scss';
export class ToggleComponent {
    constructor() {
        this.ObservedProperties = ['toggleOptions'];
        this._id = Math.random();
        this.toggleChange = this.toggleChange.bind(this);
    }
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
          onchange=${this.toggleChange}
        />
        <label for="${this._id}"></label>
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
