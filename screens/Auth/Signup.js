import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import * as Facebook from "expo-facebook";
import { useMutation } from "react-apollo-hooks";
import { CREATE_ACCOUNT } from "./AuthQueries";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.lightGrayColor};
  border-style: solid;
`;

export default ({ navigation, route }) => {
  const fNameInput = useInput("");
  const lNameInput = useInput("");
  const emailInput = useInput(route.params ? route.params.email : "");
  const userNameInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      firstName: fNameInput.value,
      lastName: lNameInput.value,
      email: emailInput.value,
      userName: userNameInput.value,
    },
  });

  const handleSignup = async () => {
    const { value: fName } = emailInput;
    const { value: lName } = emailInput;
    const { value: email } = emailInput;
    const { value: userName } = emailInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("That email is invalid");
    }
    if (fName === "") {
      return Alert.alert("I need your name");
    }
    if (userName === "") {
      return Alert.alert("Invalid username");
    }

    try {
      setLoading(true);
      const {
        data: { createAccount },
      } = await createAccountMutation();
      if (createAccount) {
        Alert.alert("Account created", "Log in now!");
        navigation.navigate("Login", { email });
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Username already taken", "Log in instead!");
      navigation.navigate("Login", { email });
    } finally {
      setLoading(false);
    }
  };

  const fbLogin = async () => {
    try {
      await Facebook.initializeAsync("1086242948439622");
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...fNameInput}
          placeholder="First name"
          autoCapitalize="words"
        />
        <AuthInput
          {...lNameInput}
          placeholder="Last name"
          autoCapitalize="words"
        />
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          autoCorrect={false}
          returnKeyType="send"
        />
        <AuthInput
          {...userNameInput}
          placeholder="Username"
          autoCorrect={false}
          returnKeyType="send"
        />
        <AuthButton text={"Sign up"} onPress={handleSignup} loading={loading} />
        <FBContainer>
          <AuthButton
            bgColor={"#2D4DA7"}
            loading={false}
            onPress={fbLogin}
            text="Connect Facebook"
          />
        </FBContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};
