import { Component, html, IHooks } from '@plumejs/core';
import { StepperOptions } from './stepper.model';
import stepperStyles from './stepper.scss?inline';

@Component({
  selector: 'ui-stepper',
  styles: stepperStyles
})
export class Stepper implements IHooks {
  static readonly observedProperties = <const>['stepperOptions', 'currentStep'];

  currentStep = 1;
  stepperOptions: StepperOptions;

  render() {
    if (this.stepperOptions) {
      return html`<div class="stepper" style="--step: ${this.currentStep}">
        ${this.stepperOptions.steps.map(({ title, caption }, index) => {
          return html`<div class="step" data-completed="${this.currentStep > index + 1 ? 'true' : 'false'}">
            <div class="title">${title}</div>
            ${caption ? html`<div class="caption">${caption}</div>` : ''}
          </div>`;
        })}
      </div>`;
    } else {
      return '';
    }
  }
}
