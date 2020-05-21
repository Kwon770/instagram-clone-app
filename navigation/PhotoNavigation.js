import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";

const PhotoStack = createStackNavigator();
const TabNavigator = createMaterialTopTabNavigator();

function PhotoTabNavigator() {
  return (
    <TabNavigator.Navigator tabBarPosition="bottom">
      <TabNavigator.Screen name="SelectPhoto" component={SelectPhoto} />
      <TabNavigator.Screen name="TakePhoto" component={TakePhoto} />
    </TabNavigator.Navigator>
  );
}

export default () => {
  return (
    <PhotoStack.Navigator>
      <PhotoStack.Screen name="PhotoTabs" component={PhotoTabNavigator} />
      <PhotoStack.Screen name="UploadPhoto" component={UploadPhoto} />
    </PhotoStack.Navigator>
  );
};
