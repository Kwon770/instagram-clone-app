import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { ThemeProvider } from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { AsyncStorage } from "react-native";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import apolloClientOptions from "./apollo";
import { ApolloProvider } from "react-apollo-hooks";
import styles from "./styles";
import NavController from "./components/NavController";
import { AuthProvider } from "./components/AuthContext";

// <AppLoading /> is loading screen what user can make
// you must preload Font or the files like img what is from app (logo, etc..).
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const preLoad = async () => {
    // await AsyncStorage.clear();
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
        request: async (operation) => {
          const token = await AsyncStorage.getItem("jwt");
          return operation.setContext({
            headers: { Authorization: `Bearer ${token}` },
          });
        },
        ...apolloClientOptions,
      });
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (!isLoggedIn || isLoggedIn === "false") {
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

  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
