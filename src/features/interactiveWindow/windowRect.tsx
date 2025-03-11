import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface windowRectState {
	top: number;
	bottom: number;
	left: number;
	right: number;
}

const initialState: windowRectState = {
	top: 0,
	bottom: 0,
	left: 0,
	right: 0
}

export const windowRectSlice = createSlice({
	name: 'windowPositions',
	initialState: initialState,
	reducers: {
		setWindowRect: (state, action: PayloadAction<windowRectState>) => {
			state.top = action.payload.top;
            state.bottom = action.payload.bottom;
            state.left = action.payload.left;
            state.right = action.payload.right;
		}
	}
});

export const { setWindowRect } = windowRectSlice.actions;
export const getWindowRect = (state: RootState) => state.windowPositions;
export const windowRectReducer = windowRectSlice.reducer;