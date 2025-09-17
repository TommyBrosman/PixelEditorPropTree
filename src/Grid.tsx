import React from 'react';
import './Grid.css';
import { boardHeight, boardWidth } from './model/InitialItemBoard';
import { Cell } from './Cell';
import { useAppStore } from './store/Hooks';
import { usePropTreeNode } from '@fluid-experimental/tree-react-api';
import { getKey, type PixelEditorSchema } from './model/Model';

export const Grid = () => {
	const store = useAppStore();

	// Populate the board
	const items = usePropTreeNode(store, (pixelEditor: PixelEditorSchema) => {
		return pixelEditor !== undefined ? [...Array(boardWidth * boardHeight)].map((_, i) => {
			const x = i % boardWidth;
			const y = Math.floor(i / boardWidth);
			const value: number | undefined = pixelEditor.board.get(getKey(x, y));

			if (value === undefined) {
				throw new Error(`Cell at ${x},${y} is not defined`);
			}

			const onClickCell = () => {
				const oldValue: number | undefined = pixelEditor.board.get(getKey(x, y));

				if (oldValue === undefined) {
					throw new Error(`Cell at ${x},${y} is not defined`);
				}

				// Toggle the color between white and black
				pixelEditor.setCell(
					x,
					y,
					1 - oldValue
				);
			}

			const key = `${x},${y}`;
			return <Cell key={key} onClickCell={onClickCell} value={value}/>
		}) : [];
	});

	return (
		<div className="grid">
			{items}
		</div>
	);
};

export default Grid;
