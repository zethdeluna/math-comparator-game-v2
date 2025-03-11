import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface placeConnectionState {
	connectPoint: string;
}

const initialState: placeConnectionState = {
	connectPoint: ''
}

export const placeConnectionSlice = createSlice({
	name: 'connectTo',
	initialState: initialState,
	reducers: {
		setConnectPoint: (state, action: PayloadAction<string>) => {
			state.connectPoint = action.payload;
		}
	}
});

export const { setConnectPoint } = placeConnectionSlice.actions;
export const getConnectPoint = (state: RootState) => state.connectTo.connectPoint;
export const placeConnectionReducer = placeConnectionSlice.reducer;