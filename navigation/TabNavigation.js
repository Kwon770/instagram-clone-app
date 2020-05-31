import React from "react";
import { View, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Tabs/Home";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import Search from "../screens/Tabs/Search";
import PostDetail from "../screens/PostDetail";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcon";
import { stackStyles } from "./config";
import styles from "../styles";
import UserDetail from "../screens/UserDetail";

const StackNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

const stackFactory = ({
  route: {
    params: { name, initialRoute, customOptions },
  },
}) => (
  <StackNavigation.Navigator
    screenOptions={{
      cardStyle: { backgroundColor: "#ffffff" },
      headerTintColor: styles.blackColor,
      headerStyle: {
        ...stackStyles,
      },
      headerBackTitle: " ",
    }}
  >
    <StackNavigation.Screen
      name={name}
      component={initialRoute}
      options={{
        ...customOptions,
      }}
    />
    <StackNavigation.Screen
      name="PostDetail"
      component={PostDetail}
      options={{
        headerTitle: "Post",
      }}
    />
    <StackNavigation.Screen
      name="UserDetail"
      component={UserDetail}
      options={({ route }) => ({ headerTitle: route.params.userName })}
    />
  </StackNavigation.Navigator>
);

export default () => {
  return (
    <TabNavigation.Navigator
      tabBarOptions={{
        showLabel: false,
        style: { backgroundColor: "#FAFAFA" },
      }}
      initialRouteName="Home"
    >
      <TabNavigation.Screen
        name="Home"
        component={stackFactory}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === "ios" ? "ios-home" : "md-home"}
            />
          ),
        }}
        initialParams={{
          initialRoute: Home,
          name: "Home",
          customOptions: {
            headerRight: () => <MessagesLink />,
            headerTitle: <NavIcon name="logo-instagram" size={32} />,
            headerTitleAlign: "center",
          },
        }}
      />
      <TabNavigation.Screen
        name="Search"
        component={stackFactory}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === "ios" ? "ios-search" : "md-search"}
            />
          ),
        }}
        initialParams={{
          initialRoute: Search,
          name: "Search",
        }}
      />
      <TabNavigation.Screen
        name="Add"
        component={View}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              size={28}
              focused={focused}
              name={Platform.OS === "ios" ? "ios-add" : "md-add"}
            />
          ),
        }}
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
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={
                Platform.OS === "ios"
                  ? focused
                    ? "ios-heart"
                    : "ios-heart-empty"
                  : focused
                  ? "md-heart"
                  : "md-heart-empty"
              }
            />
          ),
        }}
        initialParams={{ initialRoute: Notifications, name: "Notifications" }}
      />
      <TabNavigation.Screen
        name="Profile"
        component={stackFactory}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === "ios" ? "ios-person" : "md-person"}
            />
          ),
        }}
        initialParams={{ initialRoute: Profile, name: "Profile" }}
      />
    </TabNavigation.Navigator>
  );
};
