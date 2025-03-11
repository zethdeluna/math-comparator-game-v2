import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setMouseControl, getActiveMouseControl } from "../features/mouseControls/mouseControlsSlice";
import { setTopConnection, getTopConnection, setBottomConnection, getBottomConnection } from "../features/connectionLines/connections";
import { setLeftCount, setRightCount } from "../features/stackInput/stackInputSlice";
import { setPlayAnimation, getPlayAnimation, setAnimationDirection, getAnimationDirection } from "../features/connectionLines/playAnimation";
import StackInput from "./StackInput";
import SVG from "./SVG";

const ControlPanel = () => {
	const activeMouseControl = useAppSelector(getActiveMouseControl);
	const hasTopConnection = useAppSelector(getTopConnection);
	const hasBottomConnection = useAppSelector(getBottomConnection);
	const isAnimating = useAppSelector(getPlayAnimation);
	const animationDirection = useAppSelector(getAnimationDirection);
	const dispatch = useAppDispatch();

	const handleMouseControl = (e: React.MouseEvent<HTMLElement>) => {

		const target = e.target as HTMLElement;

		if ( !target.classList.contains('active') ) {

			const buttonType = target.dataset.buttontype as string;

			dispatch(setMouseControl(buttonType));

			if ( buttonType === 'update' ) {
				dispatch(setTopConnection(false));
				dispatch(setBottomConnection(false));
			}

		}

	};

	const handlePlay = () => {

		if ( !isAnimating ) {

			if ( hasTopConnection && hasBottomConnection ) {
				dispatch(setPlayAnimation(true));

				if ( animationDirection === 'forward' ) {
					dispatch(setAnimationDirection('reverse'));
				} else {
					dispatch(setAnimationDirection('forward'));
				}

				setTimeout(() => {
					dispatch(setPlayAnimation(false));
				}, 500);

			} else {
				alert('incomplete')
			}
			
		}

	};

	const handleReset = () => {

		dispatch(setTopConnection(false));
		dispatch(setBottomConnection(false));
		dispatch(setLeftCount(1));
		dispatch(setRightCount(1));
		dispatch(setMouseControl('update'));
		dispatch(setPlayAnimation(false));
		dispatch(setAnimationDirection('forward'));

	};

	return (
		<div className="control-panel">
			
			<div className="stack-inputs">
				<h2 className="eyebrow">Stacks</h2>
				<StackInput position={'left'} />
				<StackInput position={'right'} />
			</div>

			<div className="mouse-controls">
				<h2 className="eyebrow">Mouse Controls</h2>
				<button 
					type="button" 
					data-buttontype="update" 
					className={`btn update ${activeMouseControl === 'update' ? 'active' : ''}`} 
					aria-label="Add/Remove cubes" 
					onClick={handleMouseControl}
				>
					<SVG name="plus" /><SVG name="minus" />
				</button>
				<button 
					type="button" 
					data-buttontype="compare" 
					className={`btn compare ${activeMouseControl === 'compare' ? 'active' : ''}`} 
					aria-label="Draw/Compare stacks"
					onClick={handleMouseControl}
				>
					<SVG name="pencil" />
				</button>
			</div>

			<button 
				type="button" 
				className={`btn play ${animationDirection}`} 
				aria-label="Play comparator animation"
				onClick={handlePlay}
			>
				{
					animationDirection === 'forward'
						? <SVG name="play-button" />
						: <SVG name="rewind" />
				}
			</button>
			<button 
				type="button" 
				className="btn reset" 
				aria-label="Reset"
				onClick={handleReset}
			>
				Reset
			</button>
		</div>
	);
}

export default ControlPanel;