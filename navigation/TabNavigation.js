import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import Search from "../screens/Search";

const TabNavigation = createBottomTabNavigator();

export default () => {
  return (
    <TabNavigation.Navigator>
      <TabNavigation.Screen name="Home" component={Home} />
      <TabNavigation.Screen name="Search" component={Search} />
      <TabNavigation.Screen
        name="Add"
        component={View}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("PhotoNavigation");
          },
        })}
      />
      <TabNavigation.Screen name="Notifications" component={Notifications} />
      <TabNavigation.Screen name="Profile" component={Profile} />
    </TabNavigation.Navigator>
  );
};
