import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Messages from "../screens/Messages/Messages";
import Message from "../screens/Messages/Message";

const StackNavigation = createStackNavigator();

export default () => (
  <StackNavigation.Navigator>
    <StackNavigation.Screen name="Messages" component={Messages} />
    <StackNavigation.Screen name="Message" component={Message} />
  </StackNavigation.Navigator>
);
