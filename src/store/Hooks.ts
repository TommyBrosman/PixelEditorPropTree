// Create store context
import { createContext } from 'react';

// Create hook to consume context in easy way
import { useContext } from 'react';
import { PixelEditorSchema } from '../model/Model';
import { PropTreeNode } from '@fluid-experimental/tree-react-api';

export const StoreContext = createContext<PropTreeNode<PixelEditorSchema>>({} as PropTreeNode<PixelEditorSchema>);
export const StoreProvider = StoreContext.Provider;

export const useAppStore = (): PropTreeNode<PixelEditorSchema> => useContext(StoreContext);
