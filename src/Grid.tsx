import * as React from "react";
import "./Grid.css";
import { boardHeight, boardWidth } from "./model/InitialItemBoard";
import { Cell } from "./Cell";
import { useAppStore } from "./store/Hooks";
import { PropTreeNode, TreeViewComponent, withTreeObservations } from "@fluid-experimental/tree-react-api";
import { getKey, type PixelEditorSchema } from "./model/Model";

export const Grid = () => {
	const store = useAppStore();
	const root = TreeViewComponent<typeof PixelEditorSchema>({ tree: {treeView: store}, ViewComponent: Inner });
	return root;
};

export const Inner: React.FC<{root : PropTreeNode<PixelEditorSchema>}> = withTreeObservations(({ root }: { root: PixelEditorSchema }) => {
	const items = root !== undefined ? [...Array(boardWidth * boardHeight)].map((_, i) => {
		const x = i % boardWidth;
		const y = Math.floor(i / boardWidth);
		const value: number | undefined = root.board.get(getKey(x, y));

		if (value === undefined) {
			throw new Error(`Cell at ${x},${y} is not defined`);
		}

		const onClickCell = () => {
			const oldValue: number | undefined = root.board.get(getKey(x, y));

			if (oldValue === undefined) {
				throw new Error(`Cell at ${x},${y} is not defined`);
			}

			// Toggle the color between white and black
			root.setCell(
				x,
				y,
				1 - oldValue
			);
		};

		const key = `${x},${y}`;
		return <Cell key={key} onClickCell={onClickCell} value={value} />;
	}) : [];

	return <div className="grid">
		{items}
	</div>;
});

export default Grid;
