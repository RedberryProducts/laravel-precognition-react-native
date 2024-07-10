import React from 'react';

type PrecognitionProviderProps = {
    children: React.ReactNode;
};
type PrecognitionConfig = {
    url: string | null;
    headers?: any;
};
type PrecognitionConfigType = {
    config: PrecognitionConfig;
};
declare const Precognition: {
    init: (params: PrecognitionConfig) => PrecognitionConfig;
};
declare const PrecognitionContext: React.Context<PrecognitionConfigType>;
declare const PrecognitionWrapper: React.FC<PrecognitionProviderProps>;

export { Precognition, type PrecognitionConfig, type PrecognitionConfigType, PrecognitionContext, PrecognitionWrapper as default };
