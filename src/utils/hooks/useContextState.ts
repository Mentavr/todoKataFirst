import { useContext } from 'react';

import { StateContext } from '../../context/StateContext';

export const useContextState = () => {
  const context = useContext(StateContext);
  return context;
};
