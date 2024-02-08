import { IHooks, Renderer } from '@plumejs/core';
import { DataGridOptions } from './dataGrid..model';
export declare class DataGrid implements IHooks {
    private renderer;
    static readonly observedProperties: readonly ["gridOptions"];
    private columnHeaders;
    private columnValues;
    private colGroup;
    private rowData;
    private rowActions;
    private tableClassName;
    private variant;
    gridOptions: DataGridOptions;
    constructor(renderer: Renderer);
    mount(): void;
    onPropertiesChanged(): void;
    renderRowActions(rowData: Record<string, string | number | boolean>): DocumentFragment | "";
    render(): DocumentFragment | "";
}
