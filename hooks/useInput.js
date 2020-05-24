import React, { useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  // from input of react-native, there is only 'text', not 'event' or 'targe'
  const onChange = (text) => {
    setValue(text);
  };

  return { value, onChange, setValue };
};

export default useInput;
