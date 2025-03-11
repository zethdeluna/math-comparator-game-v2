import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Coordinates {
	x: number;
	y: number;
}

interface startPointState {
	coordinates: Coordinates;
}

const initialState: startPointState = {
	coordinates: { x: 0, y: 0 }
}

export const startPointSlice = createSlice({
	name: 'startPoint',
	initialState: initialState,
	reducers: {
		setStartPoint: (state, action: PayloadAction<Coordinates>) => {
			state.coordinates = action.payload;
		}
	}
});

export const { setStartPoint } = startPointSlice.actions;
export const getStartPoint = (state: RootState) => state.startPoint.coordinates;
export const startPointReducer = startPointSlice.reducer;