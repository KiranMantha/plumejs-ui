export interface IMultiSelectOptions {
    data: Array<{[key:string]: any}>;
    displayField: string;
    onchange: (selectedOption: {[key:string]: any} | Array<{[key:string]: any}>) => void;
    buttonText?: (options: Array<{[key:string]: any}>) => string;
    multiple?: boolean;
    nonSelectedText?: string;
    enableFilter?: boolean;
    disableDropdown?: boolean;
    resetWidget?: boolean;
}