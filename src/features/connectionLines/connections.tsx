import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface connectionsState {
	topConnection: boolean;
	bottomConnection: boolean;
}

const initialState: connectionsState = {
	topConnection: false,
	bottomConnection: false
}

export const connectionsSlice = createSlice({
	name: 'connections',
	initialState: initialState,
	reducers: {
		setTopConnection: (state, action: PayloadAction<boolean>) => {
			state.topConnection = action.payload;
		},
		setBottomConnection: (state, action: PayloadAction<boolean>) => {
			state.bottomConnection = action.payload;
		}
	}
});

export const { setTopConnection, setBottomConnection } = connectionsSlice.actions;
export const getTopConnection = (state: RootState) => state.connections.topConnection;
export const getBottomConnection = (state: RootState) => state.connections.bottomConnection;
export const connectionsReducer = connectionsSlice.reducer;