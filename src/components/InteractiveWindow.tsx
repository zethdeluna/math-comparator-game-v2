import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getActiveMouseControl } from "../features/mouseControls/mouseControlsSlice";
import { setActiveConnectionLine, getActiveConnectionLine } from "../features/connectionLines/connectionLinesSlice";
import { getStartPoint } from "../features/connectionLines/startPoint";
import { getEndPoint } from "../features/connectionLines/endPoint";
import { getConnectPoint, setConnectPoint } from "../features/connectionLines/placeConnection";
import { getLeftCount, getRightCount } from "../features/stackInput/stackInputSlice";
import { getTopConnection, getBottomConnection } from "../features/connectionLines/connections";
import { getPlayAnimation } from "../features/connectionLines/playAnimation";
import { getAnimationDirection } from "../features/connectionLines/playAnimation";
import { setWindowRect, getWindowRect } from "../features/interactiveWindow/windowRect";
import Stack from "./Stack";

const InteractiveWindow = () => {
	const activeMouseControl = useAppSelector(getActiveMouseControl);
	const activeConnectionLine = useAppSelector(getActiveConnectionLine);
	const startPointCoord = useAppSelector(getStartPoint);
	const endPointCoord = useAppSelector(getEndPoint);
	const connectPoint = useAppSelector(getConnectPoint);
	const hasTopConnection = useAppSelector(getTopConnection);
	const hasBottomConnection = useAppSelector(getBottomConnection);
	const leftCount = useAppSelector(getLeftCount);
	const rightCount = useAppSelector(getRightCount);
	const isAnimating = useAppSelector(getPlayAnimation);
	const animationDirection = useAppSelector(getAnimationDirection);
	const windowRect = useAppSelector(getWindowRect);
	const dispatch = useAppDispatch();
	const [viewBox, setViewBox] = useState<string>('0 0 14 14');
	const [topPathData, setTopPathData] = useState<string>('M0 0 L0 0');
	const [bottomPathData, setBottomPathData] = useState<string>('M0 0 L0 0');
	const [prevTopPathData, setPrevTopPathData] = useState<string>('M0 0 L0 0');
	const [prevBottomPathData, setPrevBottomPathData] = useState<string>('M0 0 L0 0');
	const [hasConnection, setHasConnection] = useState<boolean>(false);
	const previousStart = useRef('');
	const containerRef = useRef<HTMLElement>(null);

	useEffect(() => {

		if ( !containerRef.current ) return;

		// set viewBox dimensions
		const rect = containerRef.current.getBoundingClientRect();
		const width = rect.right - rect.left;
		const height = rect.bottom - rect.top;

		dispatch(setWindowRect({ top: rect.top - window.scrollY, bottom: rect.bottom - window.scrollY, left: rect.left, right: rect.right }));

		setViewBox(`0 0 ${width} ${height}`);

		return () => setViewBox('0 0 0 0');

	}, []);

	useEffect(() => {

		if ( containerRef.current ) {

			// Update windowRect if the user scrolls
			const updateRect = () => {

				if ( !containerRef.current ) return;

				const rect = containerRef.current.getBoundingClientRect();
		
				dispatch(setWindowRect({ top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right }));

			}

			window.addEventListener('scroll', updateRect);

			return () => {
				window.removeEventListener('scroll', updateRect);
			}

		}

	}, []);

	useEffect(() => {

		// Handle line drawing

		const isTopLine = activeConnectionLine === 'top-left' || activeConnectionLine === 'top-right';

		const handleMove = (e: PointerEvent) => {

			const xMouse = e.clientX - 45;
			const yMouse = e.clientY - windowRect.top;

			if ( isTopLine ) {
				setTopPathData(`M${startPointCoord.x} ${startPointCoord.y} L${xMouse} ${yMouse}`);
			} else {
				setBottomPathData(`M${startPointCoord.x} ${startPointCoord.y} L${xMouse} ${yMouse}`);
			}

		}

		if ( activeConnectionLine !== '' ) {

			previousStart.current = activeConnectionLine;

			// Set start position
			if ( isTopLine ) {
				setTopPathData(`M${startPointCoord.x} ${startPointCoord.y} L${startPointCoord.x} ${startPointCoord.y}`);
			} else {
				setBottomPathData(`M${startPointCoord.x} ${startPointCoord.y} L${startPointCoord.x} ${startPointCoord.y}`);
			}

			// Update pathData to track mouse

			window.addEventListener('pointermove', handleMove);

			return () => {
				window.removeEventListener('pointermove', handleMove);
			}

		} else if ( activeConnectionLine === '' && connectPoint !== '' ) {

			window.removeEventListener('pointermove', handleMove);
			dispatch(setConnectPoint(''));
			setHasConnection(true);

			if (
				( previousStart.current === 'top-left' && connectPoint === 'top-right' ) ||
				( previousStart.current === 'top-right' && connectPoint === 'top-left' )
			) {

				setTopPathData(`M${startPointCoord.x} ${startPointCoord.y} L${endPointCoord.x} ${endPointCoord.y}`);

			} else if (
				( previousStart.current === 'bottom-left' && connectPoint === 'bottom-right' ) ||
				( previousStart.current === 'bottom-right' && connectPoint === 'bottom-left' )
			) {

				setBottomPathData(`M${startPointCoord.x} ${startPointCoord.y} L${endPointCoord.x} ${endPointCoord.y}`);

			}

		} else {

			window.removeEventListener('pointermove', handleMove);
			setTopPathData('M0 0 L0 0');
			setBottomPathData('M0 0 L0 0');

		}
		
	}, [activeConnectionLine]);

	useEffect(() => {
		
		// reset lines if Mouse Control changes from "compare" to "update"
		if ( activeMouseControl === 'update' ) {

			setHasConnection(false);
			dispatch(setActiveConnectionLine(''));

			setTimeout(() => {
				setTopPathData('M0 0 L0 0');
				setBottomPathData('M0 0 L0 0');
			}, 250);

		}

	}, [activeMouseControl]);

	useEffect(() => {
		
		// Animate the lines to form a math comparator in between the stacks
		if ( isAnimating ) {

			const container = containerRef.current || '';
			if ( container ) {

				// get center position of the interactive window
				const rect = container.getBoundingClientRect();
				const width = rect.right - rect.left;
				const height = rect.bottom - rect.top;
				const xCenter = (width / 2);
				const yCenter = (height / 2) - 40;

				// remember original path coordinates
				setPrevTopPathData(topPathData);
				setPrevBottomPathData(bottomPathData);

				// draw comparator symbols
				if ( animationDirection !== 'forward' ) {

					if ( leftCount > rightCount ) {

						setTopPathData(`M${xCenter - 40} ${yCenter - 50} L${xCenter + 40} ${yCenter}`);
						setBottomPathData(`M${xCenter - 40} ${yCenter + 50} L${xCenter + 40} ${yCenter}`);

					} else if ( leftCount < rightCount ) {

						setTopPathData(`M${xCenter - 40} ${yCenter} L${xCenter + 40} ${yCenter - 50}`);
						setBottomPathData(`M${xCenter - 40} ${yCenter} L${xCenter + 40} ${yCenter + 50}`);

					} else {

						setTopPathData(`M${xCenter - 40} ${yCenter - 20} L${xCenter + 40} ${yCenter - 20}`);
						setBottomPathData(`M${xCenter - 40} ${yCenter + 20} L${xCenter + 40} ${yCenter + 20}`);

					}

				} else {

					setTopPathData(prevTopPathData);
					setBottomPathData(prevBottomPathData);

				}

			}

		}

	}, [isAnimating]);

	return (
		<section ref={containerRef} className={`interactive-window ${activeMouseControl} ${hasConnection || activeConnectionLine ? 'active-connectors' : ''}`}>
			<Stack position={'left'} />
			<Stack position={'right'} />

			<svg className="connector-container" xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
				<path className="top-line"
					d={topPathData}
					stroke="#BBDEFF"
					strokeLinecap="round"
					strokeWidth="14"
					style={{
						opacity: `${ activeConnectionLine === 'top-left' || activeConnectionLine === 'top-right' || hasTopConnection ? '1' : '0' }`,
						transition: `${ isAnimating ? 'all 0.5s ease' : 'opacity 0.25s ease' }`
					}}
				/>
				<path className="bottom-line"
					d={bottomPathData}
					stroke="#BBDEFF"
					strokeLinecap="round"
					strokeWidth="14"
					style={{
						opacity: `${ activeConnectionLine === 'bottom-left' || activeConnectionLine === 'bottom-right' || hasBottomConnection ? '1' : '0' }`,
						transition: `${ isAnimating ? 'all 0.5s ease' : 'opacity 0.25s ease' }`
					}}
				/>
			</svg>
		</section>
	);
}

export default InteractiveWindow;