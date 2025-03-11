import InteractiveWindow from "./InteractiveWindow";
import ControlPanel from "./ControlPanel";

const GameWindow = () => {
	return (
		<section className="game">

			<InteractiveWindow />

			<div className="right-column">
				<h1>Math Comparators</h1>
				<ControlPanel />
			</div>

		</section>
	);
}

export default GameWindow;