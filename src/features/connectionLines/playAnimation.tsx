import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface playState {
	beginPlay: boolean;
	direction: string;
}

const initialState: playState = {
	beginPlay: false,
	direction: 'forward'
}

export const playAnimationSlice = createSlice({
	name: 'playAnimation',
	initialState: initialState,
	reducers: {
		setPlayAnimation: (state, action: PayloadAction<boolean>) => {
			state.beginPlay = action.payload;
		},
		setAnimationDirection: (state, action: PayloadAction<string>) => {
			state.direction = action.payload;
		}
	}
});

export const { setPlayAnimation, setAnimationDirection } = playAnimationSlice.actions;
export const getPlayAnimation = (state: RootState) => state.playAnimation.beginPlay;
export const getAnimationDirection = (state: RootState) => state.playAnimation.direction;
export const playAnimationReducer = playAnimationSlice.reducer;