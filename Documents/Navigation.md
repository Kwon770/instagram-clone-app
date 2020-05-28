# Navigation

(react-navigation Docs V.5)[https://reactnavigation.org/docs/getting-started]

- Stack Navigation
- Bottom Tab Navigation
- Material Botton Tab Navigation
- Material Top Tab Navigation
- Drawer Navigation

## Setup

- First installing is for common project
- Second installing is for Expo project
- Third installing is for bare React Native project

```bash
  $ yarn add @react-navigation/native
  $ expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
  $ yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

And add this to `App.js` or `index.js` where is root from the projext

```js
import "react-native-gesture-handler";
```

## How to use stack navigation

### Install

```bash
  $ yarn add @react-navigation/stack
```

### Usage

```js
import React from "react";
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

### Embed UI to header

(Docs)[https://reactnavigation.org/docs/header-buttons/#adding-a-button-to-the-header]

```js
<Stack.Navigator>
  <Stack.Screen
    name="Nav"
    component={Nav}
    options={{
      headerRight: () => (
        <TouchableOpacity>
          <Text>HELLO</Text>
        </TouchableOpacity>
      ),
    }}
  />
</Stack.Navigator>
```

## How to use tab navigation

### Install

```bash
  $ yarn add @react-navigation/bottom-tabs
```

### Usage

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

## How to use material top tab navigation

### Install

```bash
  $ yarn add @react-navigation/material-top-tabs react-native-tab-view
```

### Several application with tab navigation

This code is the usage of material top tab navigation, having two skills to decorate

1. Tab navigator in stack navigator

User only can see the tabs of `PhotoTabs` (not `UploadPhoto` screen). But TakePhoto has click event to open `UploadPhoto` screen.

so If the event is triggered, `UploadPhoto` will be top of stack (PhotoStack) in screen.

_=> There is Two tabs (`SelectPhoto`, `TakePhoto`). If event is triggered, `UploadPhoto` will appear on top of stack_

2. Tab Position

`<TabNavigator.Navigator tabBarPosition="bottom">`

There is also Material-Bottom-Tabs. But it is different in appearance.

So we just can make material-top-tabs look like material-bottom-tabs by changing position.

### Usage

```js
import React from "react";
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
```

## Pass navigation component to other navigation

```js
const StackNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

const stackFactory = ({
  route: {
    params: { name, initialRoute },
  },
}) => (
  <StackNavigation.Navigator>
    <StackNavigation.Screen name={name} component={initialRoute} />
  </StackNavigation.Navigator>
);

export default () => {
  return (
    <TabNavigation.Navigator>
      <TabNavigation.Screen
        name="Home"
        component={stackFactory}
        initialParams={{ initialRoute: Home, name: "Home" }}
      />
      <TabNavigation.Screen
        name="Search"
        component={stackFactory}
        initialParams={{ initialRoute: Search, name: "Search" }}
      />
    </TabNavigation.Navigator>
  );
};
```

## Get Navigation from other component

_V 5.x version_

```js
import { useNavigation } from "@react-navigation/native";

export default () => {
  const navigation = useNavigation();

  return (
    <Container onPress={() => navigation.navigate("MessageNavigation")}>
      <Text>Messages</Text>
    </Container>
  );
};
```

_V 4.x version_

```js
import { withNavigation } from "react-navigation";

export default withNavigation(({ navigation }) => (
  <Container onPress={() => navigation.navigate("MessageNavigation")}>
    <Text>Messages</Text>
  </Container>
));
```

## Change default background color

When you use the navigator, you must change color property from `navigator.Screen` to change default background color.

```js
<MainNavigation.Screen
          name="MessageNavigation"
          component={MessageNavigation}
          options={{ cardStyle: { backgroundColor: "#ffffff" } }}
        />
```

_But if you want to change the color of all navigator, change it from `navigator.Navigator`.

```js
<NavigationContainer>
      <MainNavigation.Navigator
        headerMode="none"
        mode="modal"
        screenOptions={{ cardStyle: { backgroundColor: "#ffffff" } }}
      >
        <MainNavigation.Screen name="TabNavigation" component={TabNavigation} />
      </MainNavigation.Navigator>
    </NavigationContainer>
```

## Pass props, navigating navigation

_V 5.x version_

### Pass props | Set props

```js
export default ({ navigation, route }) => {
  // ~~ 

  // Navigate "Confirm" navigation, Pass value as "email" props
  navigation.navigate("Confirm", { email: value });

  // ~~
}
```

### Get props | Set props

```js
export default ({ navigation, route }) => {
  // Get params what is name, "email"
  const emailInput = useInput(route.params ? route.params.email : "");

  // ~~
}
```

## Align headerTitle 

_V 5.x version_

### Text component header

```js
<StackNavigation.Screen
      name={"Home"}
      component={Home}
      options={{
        headerTitle: <Text>header<Text>,
        headerTitleAlign: "center",
      }}
    />
```

### Image component header

```js
<StackNavigation.Screen
      name={"Home"}
      component={Home}
      options={{
        headerTitle: (
          <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ height: 35 }}
                  resizeMode="contain"
                  source={require("../assets/logo.jpg")}
                />
              </View>
        ),
        headerTitleAlign: "center",
      }}
    />
```

## Set the options of Navigation from Screen

[Options of Navigation](https://reactnavigation.org/docs/bottom-tab-navigator#options)
[Set Options from Screen](https://reactnavigation.org/docs/navigation-prop#setoptions)

```js
// Search.js (Search Screen of stack Navigation)
// To add search TextInput on header

export default ({ navigation }) => {
  navigation.setOptions({
    headerTitle: () => (
      <SearchBar
        value={search.value}
        onChange={search.onChange}
        onSubmit={() => null}
      />
    ),
  });
  const search = useInput("");
  return (
    <View>
      <Text>Search</Text>
    </View>
  );
};

```