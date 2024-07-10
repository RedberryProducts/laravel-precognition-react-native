// example/src/PrecognitionContext/index.tsx
import React from "react";
import { jsx } from "react/jsx-runtime";
var data = null;
var init = (params) => data = params;
var Precognition = {
  init
};
var PrecognitionContext = React.createContext({
  config: {
    url: null
  }
});
var PrecognitionWrapper = (props) => {
  return /* @__PURE__ */ jsx(
    PrecognitionContext.Provider,
    {
      value: {
        config: data
      },
      children: props.children
    }
  );
};
var PrecognitionContext_default = PrecognitionWrapper;

export {
  Precognition,
  PrecognitionContext,
  PrecognitionContext_default
};
