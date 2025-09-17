import { PixelEditorSchema, type SharedTreeConnection, start } from "../model/Model";
import { Tree } from "fluid-framework";
import type { AppState } from "../State";
import { PropTreeNode, toPropTreeNode } from "@fluid-experimental/tree-react-api";

export class AppStore {
	public isLoaded = false;
	public itemBoard: number[][] = [];
	private readonly sharedTreeConnection: SharedTreeConnection;

	public constructor(preloadedState?: AppState, sharedTreeConnection?: SharedTreeConnection) {
		if (preloadedState !== undefined) {
			this.isLoaded = preloadedState.isLoaded;
			this.itemBoard = preloadedState.itemBoard;
		}

		// Call before setting the connection so that it doesn't get overwritten by a Proxy object
		//makeAutoObservable(this);

		this.sharedTreeConnection = sharedTreeConnection ?? { pixelEditorTreeView: undefined };
	}

	public setCell(x: number, y: number, value: number): void {
		this.sharedTreeConnection.pixelEditorTreeView?.root.setCell(x, y, value);
	}

	// TODO: Delete?
	/**
	 * Async action. Connects to the Fluid session. Steps:
	 * - Join or create a session
	 * - Wire up events that dispatch reducers when the Shared Tree instance changes (either due to local or remote edits)
	 */
	public async connectToFluid(): Promise<void> {
		const pixelEditorTreeView = await start();
		Tree.on(pixelEditorTreeView.root, "treeChanged", () => {
			//runInAction(() => {
				this.itemBoard = pixelEditorTreeView.root.getBoardAsNestedArray();
			//});
		});

		//runInAction(() => {
			this.sharedTreeConnection.pixelEditorTreeView = pixelEditorTreeView;

			// Dispatch the first change notification. The board was loaded before the event was wired up via Tree, so we need
			// to dispatch it manually.
			this.itemBoard = pixelEditorTreeView.root.getBoardAsNestedArray();
			this.isLoaded = true;
		//});
	}
}

// TODO: Implement preloadedState
/**
 * Facade method to setting up the store.
 * @param preloadedState Preloaded state for testing.
 * @param sharedTreeConnection Contains the Shared Tree TreeView when connected. Used in tests.
 * @returns The composed store.
 */
export async function setupStore(preloadedState?: AppState, sharedTreeConnection?: SharedTreeConnection): Promise<PropTreeNode<PixelEditorSchema>> {
	const pixelEditorTreeView = sharedTreeConnection?.pixelEditorTreeView ?? await start();
	return toPropTreeNode(pixelEditorTreeView.root);
}
