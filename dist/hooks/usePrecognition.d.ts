import React from 'react';

type RequestMethodTypes = 'PUT' | 'PATCH' | 'POST' | 'DELETE' | 'GET';
type ResponseReturType = {
    message: any;
    data: any;
};
type Precognition = {
    precognition: boolean;
    validate_name: string | null;
};
type Props = {
    endpoint: string;
    method: RequestMethodTypes;
    config?: {};
};
declare const usePrecognition: <T>(props: Props) => PrecognitionReturnType<T>;
type PrecognitionReturnType<T> = {
    submit: (values: T) => Promise<ResponseReturType | undefined>;
    validateValues: (vals: Partial<Record<keyof T, any>>, fieldName?: string) => Promise<void>;
    errors: T | null;
    setErrors: React.Dispatch<React.SetStateAction<T | null>>;
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
    disabled: boolean;
    touched: T | null;
    loading: boolean;
};

export { type Precognition, usePrecognition as default };
