import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Tabs/Home";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import Search from "../screens/Tabs/Search";

const StackNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

const stackFactory = ({
  route: {
    params: { name, initialRoute, customOptions },
  },
}) => (
  <StackNavigation.Navigator>
    <StackNavigation.Screen
      name={name}
      component={initialRoute}
      options={customOptions}
    />
  </StackNavigation.Navigator>
);

export default () => {
  return (
    <TabNavigation.Navigator>
      <TabNavigation.Screen
        name="Home"
        component={stackFactory}
        initialParams={{
          initialRoute: Home,
          name: "Home",
          customOptions: {
            headerRight: () => (
              <TouchableOpacity>
                <Text>HELLO</Text>
              </TouchableOpacity>
            ),
          },
        }}
      />
      <TabNavigation.Screen
        name="Search"
        component={stackFactory}
        initialParams={{ initialRoute: Search, name: "Search" }}
      />
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
      <TabNavigation.Screen
        name="Notifications"
        component={stackFactory}
        initialParams={{ initialRoute: Notifications, name: "Notifications" }}
      />
      <TabNavigation.Screen
        name="Profile"
        component={stackFactory}
        initialParams={{ initialRoute: Profile, name: "Profile" }}
      />
    </TabNavigation.Navigator>
  );
};
