import { Component, html, IHooks, Renderer } from '@plumejs/core';
import toggleStyles from './toggle.component.scss';

export interface IToggleInput {
  onText?: string;
  offText?: string;
  isSelected?: boolean;
}

const defaultToggleOptions: IToggleInput = {
  onText: 'ON',
  offText: 'OFF',
  isSelected: false
};

@Component({
  selector: 'ui-toggle-button',
  styles: toggleStyles
})
export class ToggleComponent implements IHooks {
  readonly ObservedProperties = <const>['toggleOptions'];

  toggleOptions: IToggleInput = { ...defaultToggleOptions };
  private _id = Math.random();

  constructor(private renderer: Renderer) {}

  private toggleChange(e: Event) {
    const value = (e.target as any).checked;
    this.renderer.emitEvent('togglechange', value);
  }

  render() {
    return html`<div class="toggle-container">
      <span>${this.toggleOptions.offText.translate()}</span>
      <input
        type="checkbox"
        id="${this._id}"
        checked="${!!this.toggleOptions.isSelected}"
        onchange=${(e: Event) => {
          this.toggleChange(e);
        }}
      />
      <label for="${this._id}"></label>
      <span>${this.toggleOptions.onText.translate()}</span>
    </div>`;
  }
}
