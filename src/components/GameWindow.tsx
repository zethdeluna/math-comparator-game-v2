import InteractiveWindow from "./InteractiveWindow";
import ControlPanel from "./ControlPanel";
import SVG from "./SVG";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setPanelState, getPanelState } from "../features/controlPanel/controlPanelSlice";

const GameWindow = () => {
	const panelState = useAppSelector(getPanelState);
	const dispatch = useAppDispatch();

	const toggleControlPanel = () => {

		// Button for opening/closing control panel on smaller screens
		if ( panelState === '' ) {
			dispatch(setPanelState('controls-open'));
		} else {
			dispatch(setPanelState(''));
		}

	};

	return (
		<section className={`game ${panelState}`}>

			<InteractiveWindow />

			<div className="right-column">
				<h1>Math Comparators</h1>
				<ControlPanel />
			</div>

			<button
				className="toggle-control-panel"
				onClick={toggleControlPanel}
				aria-label="Toggle control panel"
			>
				<SVG name="caret" />
			</button>

		</section>
	);
}

export default GameWindow;