export interface IOption<T> {
    label: string;
    value: T;
    selected?: boolean;
}
export interface IDropdownOptions<T> {
    options: IOption<T>[];
    multiple?: boolean;
    defaultText?: string;
    enableFilter?: boolean;
    buttonText?: (options: IOption<T>[]) => string;
}
