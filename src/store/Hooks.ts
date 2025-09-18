import { createContext, useContext } from "react";
import type { PixelEditorSchema } from "../model/Model";
import type { PropTreeNode } from "@fluid-experimental/tree-react-api";

export const StoreContext = createContext<PropTreeNode<PixelEditorSchema>>({} as PropTreeNode<PixelEditorSchema>);
export const StoreProvider = StoreContext.Provider;

export const useAppStore = (): PropTreeNode<PixelEditorSchema> => useContext(StoreContext);
