import React from 'react';
import { PrecognitionContext } from '../PrecognitionContext';
import {
  Precognition,
  PrecognitionReturnType,
  Props,
  ResponseReturType,
} from '../types';

const usePrecognition = <T>(props: Props): PrecognitionReturnType<T> => {
  const { config } = React.useContext(PrecognitionContext);
  const [errors, setErrors] = React.useState<T | null>(null);
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const [touched, setTouched] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const setResponseErrors = (error: { [key: string]: string[] }): void => {
    let er: { [key: string]: any } = {};
    Object.keys(error).forEach((item) => {
      er = {
        ...er,
        [item]: error[item as string]?.[0] as string,
      };
    });
    setErrors(er as T);
  };

  const client = async (precognitionConfig: Precognition, body: T) => {
    setLoading(true);
    try {
      const res = await fetch(`${config.url}${props.endpoint}`, {
        method: props.method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Precognition: `${precognitionConfig?.precognition || false}`,
          'Precognition-Validate-Only': `${
            precognitionConfig?.validate_name || null
          }`,
          ...config.headers,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setLoading(false);

      return data;
    } catch (error: any) {
      if (error?.response?.data?.errors) {
        setDisabled(true);
        setResponseErrors(error?.response?.data?.errors);
      } else {
        setDisabled(true);
      }
      setLoading(false);
    }
  };

  const sendRequest = async (
    precognitionConfig: Precognition,
    body: T,
    fieldName?: string,
  ): Promise<ResponseReturType | undefined> => {
    try {
      const data = await client(precognitionConfig, body);

      if (data?.errors) {
        setDisabled(true);
        if (fieldName) {
          setTouched((prev) => ({
            ...(prev as T),
            [fieldName]: true,
          }));
        } else {
          let err = {};
          Object.keys(data?.errors).forEach((item) => {
            err = {
              ...err,
              [item]: true,
            };
          });
          setTouched(err as T);
        }

        setResponseErrors(data?.errors);
      } else {
        setErrors(null);
        setDisabled(false);
        setTouched(null);
      }

      return data;
    } catch (error: any) {
      if (error?.response?.data?.errors) {
        setDisabled(true);
        setResponseErrors(error?.response?.data?.errors);
      } else {
        setDisabled(true);
      }

      throw error;
    }
  };

  const submit = async (values: T) => {
    return await sendRequest(
      {
        precognition: false,
        validate_name: null,
      },
      values,
    );
  };

  const validate = async (
    precognitionConfig: Precognition,
    values: any,
    fieldName?: string,
  ) => {
    return await sendRequest(precognitionConfig, values, fieldName);
  };

  const validateValues = async (
    vals: Partial<Record<keyof T, any>>,
    fieldName?: string,
  ) => {
    try {
      await validate(
        {
          precognition: true,
          validate_name: Object.keys(vals).join(','),
        },
        vals,
        fieldName,
      );
    } catch (error: any) {
      setResponseErrors(error?.response?.data?.errors);
      setDisabled(true);
      if (fieldName) {
        setTouched((prev) => ({
          ...(prev as T),
          [fieldName]: true,
        }));
      } else {
        let err = {};
        Object.keys(error?.response?.data?.errors).forEach((item) => {
          err = {
            ...err,
            [item]: true,
          };
        });
        setTouched(err as T);
      }

      throw error;
    }
  };

  return {
    touched,
    validateValues,
    errors,
    submit,
    setErrors,
    disabled,
    setDisabled,
    loading,
  };
};

export default usePrecognition;
