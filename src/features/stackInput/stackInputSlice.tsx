import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface StackInputState {
	count: number;
}

const initialState: StackInputState = {
	count: 1
};

// Left Stack
export const leftStackInputSlice = createSlice({
	name: 'leftStackCount',
	initialState: initialState,
	reducers: {
		setLeftCount: (state, action: PayloadAction<number>) => {
			state.count = action.payload;
		}
	}
});

export const { setLeftCount } = leftStackInputSlice.actions;
export const getLeftCount = (state: RootState) => state.leftStackCount.count;
export const leftStackInputReducer = leftStackInputSlice.reducer;

// Right Stack
export const rightStackInputSlice = createSlice({
	name: 'rightStackCount',
	initialState: initialState,
	reducers: {
		setRightCount: (state, action: PayloadAction<number>) => {
			state.count = action.payload;
		}
	}
});

export const { setRightCount } = rightStackInputSlice.actions;
export const getRightCount = (state: RootState) => state.rightStackCount.count;
export const rightStackInputReducer = rightStackInputSlice.reducer;