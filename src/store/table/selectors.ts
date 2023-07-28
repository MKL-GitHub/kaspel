import { createSelector } from "reselect";
import { RootState } from "@store";
import { TableRow } from "./types";

const tableData = (state: RootState): TableRow[] => state.table.data;

export const selectTableData = createSelector([tableData], data => data);