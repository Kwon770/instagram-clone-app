# Navigation

- Stack Navigation
- Tab Navigation
- ?? Navigation
- Drawer Navigation

## How to use stack navigation

```js
import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Signup from "../screens/Auth/Signup";
import Login from "../screens/Auth/Login";
import Confirm from "../screens/Auth/Confirm";
import AuthHome from "../screens/Auth/AuthHome";

const AuthNavigation = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <AuthNavigation.Navigator initialRouteName="AuthHome" headerMode="none">
        <AuthNavigation.Screen name="AuthHome" component={AuthHome} />
        <AuthNavigation.Screen name="Login" component={Login} />
        <AuthNavigation.Screen name="Confirm" component={Confirm} />
        <AuthNavigation.Screen name="Signup" component={Signup} />
      </AuthNavigation.Navigator>
    </NavigationContainer>
  );
};
```

## How to use tab navigation

```js
import React from "react";
import { View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import Search from "../screens/Search";

const TabNavigation = createBottomTabNavigator();

export default () => {
  return (
    <NavigationContainer>
      <TabNavigation.Navigator>
        <TabNavigation.Screen name="Home" component={Home} />
        <TabNavigation.Screen name="Search" component={Search} />
        <TabNavigation.Screen
          name="Add"
          component={View}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              console.log("add");
            },
          }}
        />
        <TabNavigation.Screen name="Notifications" component={Notifications} />
        <TabNavigation.Screen name="Profile" component={Profile} />
      </TabNavigation.Navigator>
    </NavigationContainer>
  );
};
```
