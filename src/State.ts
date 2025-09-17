import type { TreeView } from "fluid-framework";
import type { PixelEditorSchema } from "./model/Model";

/**
 * Holds app state.
 */
export interface AppState {
	treeView: TreeView<typeof PixelEditorSchema> | undefined;
};

/**
 * The initial app state. Copied but not modified directly.
 */
export const initialAppState: AppState = {
	treeView: undefined
};
