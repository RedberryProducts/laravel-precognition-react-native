import {
  PrecognitionContext
} from "../chunk-CUEL5DNZ.mjs";

// example/src/hooks/usePrecognition.ts
import React from "react";
var usePrecognition = (props) => {
  const { config } = React.useContext(PrecognitionContext);
  const [errors, setErrors] = React.useState(null);
  const [disabled, setDisabled] = React.useState(true);
  const [touched, setTouched] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const setResponseErrors = (error) => {
    let er = {};
    Object.keys(error).forEach((item) => {
      er = {
        ...er,
        [item]: error[item]?.[0]
      };
    });
    setErrors(er);
  };
  const client = async (precognitionConfig, body) => {
    setLoading(true);
    try {
      const res = await fetch(`${config.url}${props.endpoint}`, {
        method: props.method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Precognition: `${precognitionConfig?.precognition || false}`,
          "Precognition-Validate-Only": `${precognitionConfig?.validate_name || null}`,
          ...config.headers
        },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      setLoading(false);
      return data;
    } catch (error) {
      if (error?.response?.data?.errors) {
        setDisabled(true);
        setResponseErrors(error?.response?.data?.errors);
      } else {
        setDisabled(true);
      }
      setLoading(false);
    }
  };
  const sendRequest = async (precognitionConfig, body, fieldName) => {
    try {
      const data = await client(precognitionConfig, body);
      if (data?.errors) {
        setDisabled(true);
        if (fieldName) {
          setTouched((prev) => ({
            ...prev,
            [fieldName]: true
          }));
        } else {
          let err = {};
          Object.keys(data?.errors).forEach((item) => {
            err = {
              ...err,
              [item]: true
            };
          });
          setTouched(err);
        }
        setResponseErrors(data?.errors);
      } else {
        setErrors(null);
        setDisabled(false);
        setTouched(null);
      }
      return data;
    } catch (error) {
      if (error?.response?.data?.errors) {
        setDisabled(true);
        setResponseErrors(error?.response?.data?.errors);
      } else {
        setDisabled(true);
      }
      throw error;
    }
  };
  const submit = async (values) => {
    return await sendRequest(
      {
        precognition: false,
        validate_name: null
      },
      values
    );
  };
  const validate = async (precognitionConfig, values, fieldName) => {
    return await sendRequest(precognitionConfig, values, fieldName);
  };
  const validateValues = async (vals, fieldName) => {
    try {
      await validate(
        {
          precognition: true,
          validate_name: Object.keys(vals).join(",")
        },
        vals,
        fieldName
      );
    } catch (error) {
      setResponseErrors(error?.response?.data?.errors);
      setDisabled(true);
      if (fieldName) {
        setTouched((prev) => ({
          ...prev,
          [fieldName]: true
        }));
      } else {
        let err = {};
        Object.keys(error?.response?.data?.errors).forEach((item) => {
          err = {
            ...err,
            [item]: true
          };
        });
        setTouched(err);
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
    loading
  };
};
var usePrecognition_default = usePrecognition;
export {
  usePrecognition_default as default
};
