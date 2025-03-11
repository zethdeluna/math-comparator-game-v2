import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface activeConnectionLineState {
	activeConnectionLine: string;
}

const initialState: activeConnectionLineState = {
	activeConnectionLine: ''
}

export const connectionLineSlice = createSlice({
	name: 'connectionLine',
	initialState: initialState,
	reducers: {
		setActiveConnectionLine: (state, action: PayloadAction<string>) => {
			state.activeConnectionLine = action.payload;
		}
	}
});

export const { setActiveConnectionLine } = connectionLineSlice.actions;
export const getActiveConnectionLine = (state: RootState) => state.connectionLine.activeConnectionLine;
export const connectionLineReducer = connectionLineSlice.reducer;