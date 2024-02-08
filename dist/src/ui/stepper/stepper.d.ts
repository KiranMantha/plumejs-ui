import { IHooks } from '@plumejs/core';
import { StepperOptions } from './stepper.model';
export declare class Stepper implements IHooks {
    static readonly observedProperties: readonly ["stepperOptions", "currentStep"];
    currentStep: number;
    stepperOptions: StepperOptions;
    render(): DocumentFragment | "";
}
