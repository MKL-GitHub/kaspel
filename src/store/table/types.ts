import { Dayjs } from "dayjs";

export interface TableRow {
  key: number;
  name: string;
  date: Dayjs | string;
  value: number;
}

export interface TableState {
  data: TableRow[],
}