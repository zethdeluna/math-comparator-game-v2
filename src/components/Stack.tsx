import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setLeftCount, getLeftCount, setRightCount, getRightCount } from "../features/stackInput/stackInputSlice";
import { getActiveMouseControl } from "../features/mouseControls/mouseControlsSlice";
import { setActiveConnectionLine, getActiveConnectionLine } from "../features/connectionLines/connectionLinesSlice";
import { setStartPoint } from "../features/connectionLines/startPoint";
import { setEndPoint } from "../features/connectionLines/endPoint";
import { setConnectPoint } from "../features/connectionLines/placeConnection";
import { setTopConnection, setBottomConnection } from "../features/connectionLines/connections";
import { getWindowRect } from "../features/interactiveWindow/windowRect";
import { useDragBlock } from "../app/useDragBlock";
import SVG from "./SVG";

interface StackProps {
	position: 'left' | 'right';
}

const Stack: React.FC<StackProps> = ({ position }) => {
	const count = useAppSelector( position === 'left' ? getLeftCount : getRightCount );
	const activeMouseControl = useAppSelector(getActiveMouseControl);
	const activeConnectionLine = useAppSelector(getActiveConnectionLine);
	const windowRect = useAppSelector(getWindowRect);
	const dispatch = useAppDispatch();
	const [connectorState, setConnectorState] = useState<string>('');
	const { cursorPosition, isDragging, ref } = useDragBlock();
	const xOffset = 39;

	useEffect(() => {
		
		if ( activeMouseControl === 'compare' ) {
			setConnectorState('active');
		} else {
			setConnectorState('');
		}

		return () => setConnectorState('');

	}, [activeMouseControl]);

	const clickStack = () => {

		// Add a block if the user clicks on the stack and the count is less than 10
		if ( count < 10 && activeMouseControl === 'update') {

			const increment = count + 1;

			if ( position === 'left' ) {
				dispatch(setLeftCount(increment));
			} else {
				dispatch(setRightCount(increment));
			}

		}

	};

	const updateStates = (button: HTMLElement) => {
		const endRect = button.getBoundingClientRect();
		const xCenter = endRect.right - ((endRect.right - endRect.left) / 2) - xOffset;
		// const yCenter = endRect.bottom - ((endRect.bottom - endRect.top) / 2) + yOffset + window.scrollY;
		const yCenter = endRect.bottom - windowRect.top - ( (endRect.bottom - endRect.top) / 2 );

		dispatch(setEndPoint({ x: xCenter, y: yCenter }));
		dispatch(setActiveConnectionLine(''));
		dispatch(setConnectPoint(button.dataset.connector || ''));
	};

	const clickConnector = (e: React.MouseEvent<HTMLButtonElement>) => {

		// Initiate drawing

		const button = e.currentTarget;

		if ( activeConnectionLine === '' ) {

			const buttonLabel = button.dataset.connector || '';
			dispatch(setActiveConnectionLine(buttonLabel));

			// Get starting point for the line
			const startRect = button.getBoundingClientRect();
			const xCenter = startRect.right - ((startRect.right - startRect.left) / 2) - xOffset;
			const yCenter = startRect.bottom - windowRect.top - ( (startRect.bottom - startRect.top) / 2 );

			dispatch(setStartPoint({ x: xCenter, y: yCenter }));

		} else if ( activeConnectionLine === 'top-left' ) {

			// If the starting point is at top-left, the only option is to click top-right

			if ( button.dataset.connector === 'top-right' ) {

				updateStates(button);
				dispatch(setTopConnection(true));

			}

		} else if ( activeConnectionLine === 'top-right' ) {

			// If the starting point is at top-right, the only option is to click top-left

			if ( button.dataset.connector === 'top-left' ) {

				updateStates(button);
				dispatch(setTopConnection(true));

			}

		} else if ( activeConnectionLine === 'bottom-left' ) {

			// If the starting point is at bottom-left, the only option is to click bottom-right

			if ( button.dataset.connector === 'bottom-right' ) {

				updateStates(button);
				dispatch(setBottomConnection(true));

			}

		} else if ( activeConnectionLine === 'bottom-right' ) {

			// If the starting point is at bottom-right, the only option is to click bottom-left

			if ( button.dataset.connector === 'bottom-left' ) {

				updateStates(button);
				dispatch(setBottomConnection(true));

			}

		}

	}

	return (
		<div
			ref={ref} 
			className={`stack ${position} ${isDragging ? 'grabbing' : ''}`}
			onClick={clickStack}
		>

			<div className="stack-wrapper">
				<button
					className={`connector top ${position} ${connectorState}`}
					aria-label={`Top ${position} connector button`}
					data-connector={`top-${position}`}
					onClick={clickConnector}
				/>
				
				<div className="stack-container">
					{
						Array.from({ length: count }).map((_, index) => (
							<div key={index} className="ice-cube">
								<SVG name="ice-cube" />
							</div>
						))
					}
				</div>

				<button
					className={`connector bottom ${position} ${connectorState}`}
					aria-label={`Bottom ${position} connector button`}
					data-connector={`bottom-${position}`}
					onClick={clickConnector}
				/>
			</div>

			<h3>{count}</h3>

			<div
				className={`floating-ice-cube ${isDragging ? 'active' : ''}`}
				style={{
					translate: `${cursorPosition.x}px ${cursorPosition.y}px`
				}}
			>
				<SVG name="ice-cube" />
			</div>
		</div>
	);
}

export default Stack;