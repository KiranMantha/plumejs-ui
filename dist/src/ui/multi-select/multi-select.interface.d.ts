export interface IMultiSelectOptions {
    data: Array<{
        [key: string]: any;
    }> | Array<string>;
    onchange: (selectedOption: {
        [key: string]: any;
    } | Array<{
        [key: string]: any;
    }> | string | Array<string>) => void;
    displayField?: string;
    selectedValues?: Array<{
        [key: string]: any;
    }> | Array<string>;
    buttonText?: (options: Array<{
        [key: string]: any;
    }> | Array<string>) => string;
    multiple?: boolean;
    nonSelectedText?: string;
    enableFilter?: boolean;
    disableDropdown?: boolean;
    resetWidget?: boolean;
}
