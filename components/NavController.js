import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useIsLoggedIn, useLogOut, useLogIn } from "./AuthContext";

export default () => {
  const isLoggedIn = useIsLoggedIn();
  const logIn = useLogIn();
  const logOut = useLogOut();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isLoggedIn === true ? (
        <TouchableOpacity onPress={logOut}>
          <Text>Log Out</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={logIn}>
          <Text>Log In</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
