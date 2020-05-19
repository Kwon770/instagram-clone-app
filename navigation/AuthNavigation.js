import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { createAppContainer } from "react-navigation";
import Signup from "../screen/Auth/Signup";
import Login from "../screen/Auth/Login";
import Confirm from "../screen/Auth/Confirm";
import AuthHome from "../screen/Auth/AuthHome";

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
