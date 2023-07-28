import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TableRow, TableState } from './types';

const initialState: TableState = {
  data: [],
};

const reducers = {
  addRow: (state: TableState, action: PayloadAction<TableRow>) => {
    state.data.push(action.payload)
  },

  deleteRowByKey: (state: TableState, action: PayloadAction<number>) => {
    state.data = state.data.filter(row => row.key !== action.payload);
  },

  editRow: (state: TableState, action: PayloadAction<TableRow>) => {
    let row = state.data.find(row => row.key === action.payload.key);
    row && Object.assign(row, action.payload);
  }
}

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers
});

export const { addRow, editRow, deleteRowByKey } = tableSlice.actions;

export const tableReducer = tableSlice.reducer;
