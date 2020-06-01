import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { stackStyles } from "./config";
import styles from "../styles";

const PhotoStack = createStackNavigator();
const TabNavigator = createMaterialTopTabNavigator();

const PhotoTabNavigator = () => (
  <TabNavigator.Navigator
    tabBarPosition="bottom"
    tabBarOptions={{
      indicatorStyle: { backgroundColor: styles.blackColor, marginBottom: 20 },
      style: { ...stackStyles, paddingBottom: 20 },
      labelStyle: { color: styles.blackColor, fontWeight: "600" },
    }}
  >
    <TabNavigator.Screen
      name="SelectPhoto"
      component={SelectPhoto}
      options={{ tabBarLabel: "Select" }}
    />
    <TabNavigator.Screen
      name="TakePhoto"
      component={TakePhoto}
      options={{ tabBarLabel: "Take" }}
    />
  </TabNavigator.Navigator>
);

export default () => {
  return (
    <PhotoStack.Navigator>
      <PhotoStack.Screen
        name="PhotoTabs"
        component={PhotoTabNavigator}
        options={{
          title: "Choose Photo",
        }}
      />
      <PhotoStack.Screen
        name="UploadPhoto"
        component={UploadPhoto}
        options={{
          cardStyle: { backgroundColor: "#ffffff" },
          headerTintColor: styles.blackColor,
          headerStyle: {
            ...stackStyles,
          },
        }}
      />
    </PhotoStack.Navigator>
  );
};
