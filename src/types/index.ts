export type PrecognitionProviderProps = {
  children: React.ReactNode;
};

export type PrecognitionConfig = {
  url: string | null;
  headers?: any;
};

export type PrecognitionConfigType = {
  config: PrecognitionConfig;
};

export type RequestMethodTypes = 'PUT' | 'PATCH' | 'POST' | 'DELETE' | 'GET';

export type ResponseReturType = {
  message: any;
  data: any;
};

export type Precognition = {
  precognition: boolean;
  validate_name: string | null;
};

export type Props = {
  endpoint: string;
  method: RequestMethodTypes;
  config?: {};
};

export type PrecognitionReturnType<T> = {
  submit: (values: T) => Promise<ResponseReturType | undefined>;
  validateValues: (
    vals: Partial<Record<keyof T, any>>,
    fieldName?: string,
  ) => Promise<void>;
  errors: T | null;
  setErrors: React.Dispatch<React.SetStateAction<T | null>>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  disabled: boolean;
  touched: T | null;
  loading: boolean;
};
