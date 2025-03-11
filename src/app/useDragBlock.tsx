import { useState, useEffect, useRef, RefObject } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setLeftCount, getLeftCount, setRightCount, getRightCount } from "../features/stackInput/stackInputSlice";
import { getActiveMouseControl } from "../features/mouseControls/mouseControlsSlice";

interface Position {
	x: number;
	y: number;
}

interface UseDragBlockProps {
	cursorPosition: Position;
	isDragging: boolean;
	ref: RefObject<HTMLDivElement | null>
}

export function useDragBlock(): UseDragBlockProps {
	const leftCount = useAppSelector(getLeftCount);
	const rightCount = useAppSelector(getRightCount);
	const mouseControl = useAppSelector(getActiveMouseControl);
	const dispatch = useAppDispatch();
	const [cursorPosition, setCursorPosition] = useState<Position>({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [dragStartLeft, setDragStartLeft] = useState<boolean>(false);
	const [dragStartRight, setDragStartRight] = useState<boolean>(false);
	const ref = useRef<HTMLDivElement>(null);
	const xOffset = 30;
	const yOffset = -30;

	const handlePointerDown = (e: PointerEvent) => {

		if ( ref.current && ref.current.contains(e.target as Node) && mouseControl === 'update' ) {
			setIsDragging(true);

			if ( ref.current.classList.contains('left') ) {
				setDragStartLeft(true);
			} else {
				setDragStartRight(true);
			}

			setCursorPosition({ x: e.clientX - xOffset, y: e.clientY + yOffset });
		}

	}

	const handlePointerMove = (e: PointerEvent) => {
		if ( isDragging ) {
			setCursorPosition({ x: e.clientX - xOffset, y: e.clientY + yOffset });
		}
	}

	const handlePointerUp = (e: PointerEvent) => {
	
		if ( isDragging && (dragStartLeft || dragStartRight) ) {

			const element = ref.current;
			if ( element ) {

				const rect = element.getBoundingClientRect();
				const isInside = (
					e.clientX >= rect.left &&
					e.clientX <= rect.right &&
					e.clientY >= rect.top &&
					e.clientY <= rect.bottom
				);

				if ( !isInside ) {
					let buffer;

					if ( dragStartLeft ) {
						buffer = leftCount;
						if ( buffer > 1 ) {
							dispatch(setLeftCount(buffer - 1));
						}
					} else if ( dragStartRight ) {
						buffer = rightCount;
						if ( buffer > 1 ) {
							dispatch(setRightCount(buffer - 1));
						}
					}
					
				}

			}

		}

		setIsDragging(false);
		setDragStartLeft(false);
	}

	useEffect(() => {
		
		window.addEventListener('pointerdown', handlePointerDown);
		window.addEventListener('pointermove', handlePointerMove);
		window.addEventListener('pointerup', handlePointerUp);

		return () => {
			window.removeEventListener('pointerdown', handlePointerDown);
			window.removeEventListener('pointermove', handlePointerMove);
			window.removeEventListener('pointerup', handlePointerUp);
		}

	}, [isDragging]);

	return { cursorPosition, isDragging, ref };
}