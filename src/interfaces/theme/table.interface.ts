export default {};

export interface TableColumn {
  name: string;
  label: string;
  field: string | ((row: any) => any);
  required?: boolean | undefined;
  align?: "left" | "right" | "center" | undefined;
  sortable?: boolean | undefined;
  headerStyle?: string;
  style?: string;
}
