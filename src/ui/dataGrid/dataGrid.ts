import { Component, html, IHooks, Renderer } from '@plumejs/core';
import { DataGridOptions } from './dataGrid..model';
import dataGridStyles from './dataGrid.scss?inline';

@Component({
  selector: 'ui-datagrid',
  styles: dataGridStyles,
  deps: [Renderer]
})
export class DataGrid implements IHooks {
  static readonly observedProperties = <const>['gridOptions'];
  private columnHeaders: string[];
  private columnValues: string[];
  private colGroup: number[];
  private rowData: Array<Record<string, string | number | boolean>>;
  private rowActions: Array<(rowData: Record<string, string | number | boolean>) => DocumentFragment>;
  private tableClassName: string;
  private variant: 'table' | 'list';

  gridOptions: DataGridOptions;

  constructor(private renderer: Renderer) {}

  mount() {
    this.tableClassName = this.renderer.hostElement.getAttribute('class');
  }

  onPropertiesChanged() {
    console.log(this.gridOptions);
    const { columns, data, rowActions = [], variant = 'table', colGroup = [] } = this.gridOptions;
    this.columnHeaders = columns.map((column) => column.label);
    this.columnValues = columns.map((column) => column.value);
    this.rowData = data;
    this.rowActions = rowActions;
    this.variant = variant;
    this.colGroup = colGroup;
  }

  renderRowActions(rowData: Record<string, string | number | boolean>) {
    if (this.rowActions.length) {
      return html`<td>${this.rowActions.map((action) => action(rowData))}</td>`;
    } else {
      return '';
    }
  }

  render() {
    if (this.gridOptions) {
      return html`
        <table class="${this.variant === 'table' ? 'table-bordered' : 'table-list table-hover'} ${this.tableClassName}">
          ${this.colGroup.length
            ? html`
                <colgroup>
                  ${this.colGroup.map((col) => html`<col width="${col}"></col>`)}
                </colgroup>
              `
            : ''}
          <thead>
            <tr>
              ${this.columnHeaders.map((header) => html`<th>${header}</th>`)}
              ${this.rowActions.length ? html`<th></th>` : ''}
            </tr>
          </thead>
          <tbody>
            ${this.rowData.length
              ? this.rowData.map((row) => {
                  return html`
                    <tr>
                      ${this.columnValues.map((column, index) => {
                        return html`<td title="${row[column]}">
                          <div>${this.columnHeaders[index]}</div>
                          ${row[column]}
                        </td>`;
                      })}
                      ${this.renderRowActions(row)}
                    </tr>
                  `;
                })
              : `<tr><td colspan="${this.columnHeaders.length}" class="center">No Data Found</td></tr>`}
          </tbody>
        </table>
      `;
    } else {
      return '';
    }
  }
}
