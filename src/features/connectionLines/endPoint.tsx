import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Coordinates {
	x: number;
	y: number;
}

interface endPointState {
	coordinates: Coordinates;
}

const initialState: endPointState = {
	coordinates: { x: 0, y: 0 }
}

export const endPointSlice = createSlice({
	name: 'endPoint',
	initialState: initialState,
	reducers: {
		setEndPoint: (state, action: PayloadAction<Coordinates>) => {
			state.coordinates = action.payload;
		}
	}
});

export const { setEndPoint } = endPointSlice.actions;
export const getEndPoint = (state: RootState) => state.endPoint.coordinates;
export const endPointReducer = endPointSlice.reducer;