# Context

## Setup

`Context.js`

This code for setup context. We can make mutiple Xontext, so if you need Context for specific informtaion.

Departmentalize Context. But there must be the code to connect each Context.

```js
import React, { createContext, useContext, useState } from "react";

export const Context = createContext();

export const Provider = ({ A_VALUE: A_VALUE_PROP, children }) => {
  const [A_VALUE, SET_A_VALUE] = useState(A_VALUE_PROP);
  const A_FUNCTION = () => {};

  const B_FUNCTION = () => {};

  return (
    <Context.Provider value={{ A_VALUE, A_FUNCTION, B_FUNCTION }}>
      {children}
    </Context.Provider>
  );
};

export const use_A_VALUE = () => {
  const { A_VALUE } = useContext(Context);
  return isLoggedIn;
};

export const use_A_FUNCTION = () => {
  const { A_FUNCTION } = useContext(Context);
  return A_FUNCTION;
};

export const use_B_FUNCTION = () => {
  const { B_FUNCTION } = useContext(Context);
  return B_FUNCTION;
};
```

`App.js`

To use Context, you must wrap all component (or component where you want to use Context)
```js
import { ApolloProvider } from "react-apollo-hooks";
import Controller from "./components/Controller.js"; // where i want to use Context
import { Provider } from "./components/AuthContext"; // single Context Provider or one of mutiple Context for specific Context
 
export default function App() {
    // SKIP
    return (
        <ApolloProvider client={client}>
            <AuthProvider isLoggedIn={isLoggedIn}>
                <Controller />
            </AuthProvider>
        </ApolloProvider>
    )
}
```

`Controller.js`

```js
import { use_A_VALUE, use_A_FUNCTION, use_B_FUNCTION } from "./Context";

export default () => {
  const A_VAL = use_A_VALUE();
  const A_FUN = use_A_FUNCTION();
  const B_FUN = use_B_FUNCTION();
  return (
      <View>
      {A_VAL === true ? (
        <TouchableOpacity onPress={A_FUN}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={B_FUN}>
          <Text>Log In</Text>
        </TouchableOpacity>
      )}
      </View>
  );
};

```