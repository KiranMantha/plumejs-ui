export interface Column {
  label: string;
  value: string;
}

export interface DataGridOptions {
  columns: Column[];
  data: Array<Record<string, string | number | boolean>>;
  variant?: 'table' | 'list';
  colGroup?: number[];
  rowActions?: Array<(rowData: Record<string, string | number | boolean>) => DocumentFragment>;
}
