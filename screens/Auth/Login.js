import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import { Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ navigation }) => {
  const emailInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [requestSecret] = useMutation(LOG_IN, {
    variables: {
      email: emailInput.value,
    },
  });
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const handleLogin = async () => {
    const { value } = emailInput;
    if (value == "") {
      return Alert.alert("Email can't be empty");
    } else if (!value.includes("@") || !value.includes(".")) {
      return Alert.alert("Please write an email");
    } else if (!emailRegex.test(value)) {
      return Alert.alert("That email is invalid");
    }

    try {
      setLoading(true);
      await requestSecret();
      Alert.alert("Check your email");
      navigation.navigate("Confirm");
    } catch (e) {
      Alert.alert("Can't log in now");
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          autoCorrect={false}
          onEndEditing={handleLogin}
          returnKeyType="send"
        />
        <AuthButton text={"Log In"} onPress={handleLogin} loading={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
};
