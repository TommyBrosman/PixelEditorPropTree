import { type PixelEditorSchema, type SharedTreeConnection, start } from "../model/Model";
import type { AppState } from "../State";
import { type PropTreeNode, toPropTreeNode } from "@fluid-experimental/tree-react-api";

/**
 * Facade method to setting up the store.
 * @param preloadedState Preloaded state for testing.
 * @param sharedTreeConnection Contains the Shared Tree TreeView when connected. Used in tests.
 * @returns The composed store.
 */
export async function setupStore(preloadedState?: AppState, sharedTreeConnection?: SharedTreeConnection): Promise<PropTreeNode<PixelEditorSchema>> {
	// If preloaded state is provided, create a `PixelEditorSchema` instance and use it to populate the board
	if (preloadedState !== undefined) {
		if (preloadedState.treeView === undefined) {
			throw new Error("If preloadedState is provided, treeView must be defined.");
		}
		return toPropTreeNode(preloadedState.treeView.root);
	}

	if (sharedTreeConnection === undefined) {
		throw new Error("Expected sharedTreeConnection to be defined when preloadedState is not provided.");
	}

	// Create or join a session
	const pixelEditorTreeView = sharedTreeConnection.pixelEditorTreeView ?? await start();
	return toPropTreeNode(pixelEditorTreeView.root);
}
