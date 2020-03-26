interface IToggleInput {
    onchange: (checked?: boolean) => void;
    onText?: string;
    offText?: string;
    isSelected?: boolean;
}
declare const registerToggleComponent: () => void;
export { registerToggleComponent, IToggleInput };
