import { Component, html, IHooks } from '@plumejs/core';
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
export class ToggleComponent implements IHooks {
  readonly ObservedProperties = <const>['toggleOptions'];

  toggleOptions: IToggleInput;
  private _id = Math.random();

  private toggleChange(e: Event) {
    const value = (e.target as any).checked;
    this.toggleOptions.onchange(value);
  }

  render() {
    if (this.toggleOptions) {
      return html` <div class="toggle-container">
        <span>${this.toggleOptions.offText ? this.toggleOptions.offText.translate() : ''}</span>
        <input
          type="checkbox"
          id="${this._id}"
          checked="${!!this.toggleOptions.isSelected}"
          onchange=${(e: Event) => {
            this.toggleChange(e);
          }}
        />
        <label for="${this._id}"></label>
        <span>${this.toggleOptions.onText ? this.toggleOptions.onText.translate() : ''}</span>
      </div>`;
    } else {
      return html`<div></div>`;
    }
  }
}
