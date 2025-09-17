import { type PixelEditorSchema, type SharedTreeConnection, start } from "../model/Model";
import { type PropTreeNode, toPropTreeNode } from "@fluid-experimental/tree-react-api";

/**
 * Facade method to setting up the store.
 * @param sharedTreeConnection Contains the Shared Tree TreeView when connected. Specified by tests in order to inject preloaded
 * state without connecting to a service backend.
 * @returns The composed store.
 */
export async function setupStore(sharedTreeConnection: SharedTreeConnection): Promise<PropTreeNode<PixelEditorSchema>> {
	// If preloaded state is provided or if we area already connected to a tree, create a `PixelEditorSchema` instance and
	// use it to populate the board.
	if (sharedTreeConnection.pixelEditorTreeView !== undefined) {
		const pixelEditor = toPropTreeNode(sharedTreeConnection.pixelEditorTreeView.root);
		return pixelEditor;
	}

	// Create or join a session
	const pixelEditorTreeView = await start();
	const pixelEditor = toPropTreeNode(pixelEditorTreeView.root);

	// Side-effect: some tests keep track of whether we are connected or not, so this method needs to update the connection object.
	sharedTreeConnection.pixelEditorTreeView = pixelEditorTreeView;
	return pixelEditor;
}
