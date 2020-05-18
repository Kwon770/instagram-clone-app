import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { TouchableOpacity, Text, View, AsyncStorage } from "react-native";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import apolloClientOptions from "./apollo";
import { ApolloProvider } from "react-apollo-hooks";
import styles from "./styles";

// <AppLoading /> is loading screen what user can make
// you must preload Font or the files like img what is from app (logo, etc..).
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font,
      });
      await Asset.loadAsync([require("./assets/logo.jpg")]);
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      const client = new ApolloClient({
        cache,
        ...apolloClientOptions,
      });
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (isLoggedIn === null || isLoggedIn === "false") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setClient(client);
      setLoaded(true);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    preLoad();
  }, []);

  const logUserIn = async () => {
    try {
      // Only support string type
      await AsyncStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };

  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {isLoggedIn === true ? (
            <TouchableOpacity onPress={logUserOut}>
              <Text>Log Out</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={logUserIn}>
              <Text>Log In</Text>
            </TouchableOpacity>
          )}
        </View>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
