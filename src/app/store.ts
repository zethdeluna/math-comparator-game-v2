import { configureStore } from "@reduxjs/toolkit";
import { leftStackInputReducer, rightStackInputReducer } from "../features/stackInput/stackInputSlice";
import { mouseControlReducer } from "../features/mouseControls/mouseControlsSlice";
import { connectionLineReducer } from "../features/connectionLines/connectionLinesSlice";
import { startPointReducer } from "../features/connectionLines/startPoint";
import { endPointReducer } from "../features/connectionLines/endPoint";
import { placeConnectionReducer } from "../features/connectionLines/placeConnection";
import { connectionsReducer } from "../features/connectionLines/connections";
import { playAnimationReducer } from "../features/connectionLines/playAnimation";
import { windowRectReducer } from "../features/interactiveWindow/windowRect";

const store = configureStore({
	reducer: {
		leftStackCount: leftStackInputReducer,
		rightStackCount: rightStackInputReducer,
		mouseControl: mouseControlReducer,
		connectionLine: connectionLineReducer,
		startPoint: startPointReducer,
		endPoint: endPointReducer,
		connectTo: placeConnectionReducer,
		connections: connectionsReducer,
		playAnimation: playAnimationReducer,
		windowPositions: windowRectReducer
	}
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;