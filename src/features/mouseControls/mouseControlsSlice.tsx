import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface MouseControlState {
	activeMouseControl: string;
}

const initialState: MouseControlState = {
	activeMouseControl: 'update'
}

export const mouseControlSlice = createSlice({
	name: 'mouseControl',
	initialState: initialState,
	reducers: {
		setMouseControl: (state, action: PayloadAction<string>) => {
			state.activeMouseControl = action.payload;
		}
	}
});

export const { setMouseControl } = mouseControlSlice.actions;
export const getActiveMouseControl = (state: RootState) => state.mouseControl.activeMouseControl;
export const mouseControlReducer = mouseControlSlice.reducer;