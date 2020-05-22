# React Native

## TextInput

This is same with Input of React.

The callback function only get `text`, not `event` or `target` like Input of React.

```js
const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (text) => {
    setValue(text);
  };

  return { value, onChange };
};
```