import React from 'react';
import {
  PrecognitionConfig,
  PrecognitionConfigType,
  PrecognitionProviderProps,
} from '../types';

let data: PrecognitionConfig = {
  url: null,
};

const init = (params: PrecognitionConfig) => {
  data = params;
};

export const Precognition = {
  init,
};

export const PrecognitionContext = React.createContext<PrecognitionConfigType>({
  config: data,
});

const PrecognitionWrapper: React.FC<PrecognitionProviderProps> = ({
  children,
}): JSX.Element => {
  return (
    <PrecognitionContext.Provider value={{ config: data }}>
      {children}
    </PrecognitionContext.Provider>
  );
};

export default PrecognitionWrapper;
