import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setLeftCount, getLeftCount, setRightCount, getRightCount } from "../features/stackInput/stackInputSlice";
import { setMouseControl, getActiveMouseControl } from "../features/mouseControls/mouseControlsSlice";
import { setTopConnection, setBottomConnection } from "../features/connectionLines/connections";

interface StackInputProps {
	position: 'left' | 'right';
};

const StackInput: React.FC<StackInputProps> = ({ position }) => {
	const stackCount = useAppSelector( position === 'left' ? getLeftCount : getRightCount );
	const mouseControl = useAppSelector(getActiveMouseControl);
	const dispatch = useAppDispatch();
	const [countString, setCountString] = useState<string>(stackCount.toString());
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {

		setCountString(e.target.value);
		
	};

	const handleOnBlur = () => {

		// Enforce displaying range 1-10
		if ( countString === '' || parseInt(countString) <= 0 ) {
			setCountString('1');
		} else if ( parseInt(countString) > 10 ) {
			setCountString('10');
		}

	};

	const handleClick = () => {

		if ( mouseControl !== 'update' ) {
			dispatch(setMouseControl('update'));
			dispatch(setTopConnection(false));
			dispatch(setBottomConnection(false));
		}

		if (inputRef.current && document.activeElement !== inputRef.current) {
			inputRef.current.focus();
		}

	};

	useEffect(() => {

		let count;

		// Ensure values are within 1 and 10 (inclusive)
		let countBuffer = parseInt(countString) || 1;
		count = Math.max(1, Math.min(countBuffer, 10));

		// Update redux states
		if ( position === 'left' ) {

			dispatch(setLeftCount(count));

		} else {

			dispatch(setRightCount(count));

		}

	}, [countString]);

	useEffect(() => {
		
		// Update inputs if stack counts are changed via the interactive window
		setCountString(stackCount.toString());

	}, [stackCount]);

	const stackId = `${position}-stack-input`;

	return (
		<div className="stack-input" onClick={handleClick}>
			<label htmlFor={stackId}>{position}</label>
			<input
				type="number" 
				ref={inputRef}
				id={stackId}
				name={stackId}
				value={countString}
				onChange={handleInput}
				onBlur={handleOnBlur}
				min={1}
				max={10}
				aria-label={`${position} stack count`}
			/>
		</div>
	);
}

export default StackInput;