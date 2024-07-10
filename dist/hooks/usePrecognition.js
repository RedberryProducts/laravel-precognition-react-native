"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// example/src/hooks/usePrecognition.ts
var usePrecognition_exports = {};
__export(usePrecognition_exports, {
  default: () => usePrecognition_default
});
module.exports = __toCommonJS(usePrecognition_exports);
var import_react2 = __toESM(require("react"));

// example/src/PrecognitionContext/index.tsx
var import_react = __toESM(require("react"));
var import_jsx_runtime = require("react/jsx-runtime");
var PrecognitionContext = import_react.default.createContext({
  config: {
    url: null
  }
});

// example/src/hooks/usePrecognition.ts
var usePrecognition = (props) => {
  const { config } = import_react2.default.useContext(PrecognitionContext);
  const [errors, setErrors] = import_react2.default.useState(null);
  const [disabled, setDisabled] = import_react2.default.useState(true);
  const [touched, setTouched] = import_react2.default.useState(null);
  const [loading, setLoading] = import_react2.default.useState(false);
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
