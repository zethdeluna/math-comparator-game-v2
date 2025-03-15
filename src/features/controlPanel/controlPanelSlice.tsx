import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface panelState {
	controlPanelState: string;
}

const initialState: panelState = {
	controlPanelState: ''
}

export const controlPanelSlice = createSlice({
	name: 'controlPanel',
	initialState: initialState,
	reducers: {
		setPanelState: (state, action: PayloadAction<string>) => {
			state.controlPanelState = action.payload;
		}
	}
});

export const { setPanelState } = controlPanelSlice.actions;
export const getPanelState = (state: RootState) => state.controlPanel.controlPanelState;
export const controlPanelReducer = controlPanelSlice.reducer;