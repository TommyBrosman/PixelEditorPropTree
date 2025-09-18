import { createContext, useContext } from "react";
import type { PixelEditorSchema } from "../model/Model";
import { TreeView } from "fluid-framework";

export const StoreContext = createContext<TreeView<typeof PixelEditorSchema>>(
  {} as TreeView<typeof PixelEditorSchema>
);
export const StoreProvider = StoreContext.Provider;

export const useAppStore = (): TreeView<typeof PixelEditorSchema> =>
  useContext(StoreContext);
