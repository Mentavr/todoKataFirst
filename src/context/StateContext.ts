import { createContext } from 'react';

import { IContextValue } from '../types/contextTypes';

export const StateContext = createContext<IContextValue>({} as IContextValue);
