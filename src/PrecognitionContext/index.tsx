import React from 'react';

type PrecognitionProviderProps = {
  children: React.ReactNode;
};

export type PrecognitionConfig = {
  url: string | null;
  headers?: any;
};

export type PrecognitionConfigType = {
  config: PrecognitionConfig;
};

let data: PrecognitionConfig | null = null;

const init = (params: PrecognitionConfig) => (data = params);

export const Precognition = {
  init,
};

export const PrecognitionContext = React.createContext<PrecognitionConfigType>({
  config: {
    url: null,
  },
});

const PrecognitionWrapper: React.FC<PrecognitionProviderProps> = props => {
  return (
    <PrecognitionContext.Provider
      value={{
        config: data as PrecognitionConfig,
      }}>
      {props.children}
    </PrecognitionContext.Provider>
  );
};

export default PrecognitionWrapper;
