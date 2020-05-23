import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const Container = styled.View`
  margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
  width: ${constants.width / 2};
  padding: 10px;
  background-color: ${(props) => props.theme.grayColor};
  border: 1px solid ${(props) => props.theme.darkGrayColor};
  border-radius: 4px;
`;

const AuthInput = ({
  keyboardType = "default",
  placeholder,
  value,
  autoCapitalize = "none",
  returnKeyType = "done",
  autoCorrect = true,
  onEndEditing = () => null,
  onChange,
}) => (
  <Container>
    <TextInput
      keyboardType={keyboardType}
      placeholder={placeholder}
      value={value}
      autoCapitalize={autoCapitalize}
      returnKeyType={returnKeyType}
      autoCorrect={autoCorrect}
      onEndEditing={onEndEditing}
      onChangeText={onChange}
    />
  </Container>
);

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad",
  ]),
  autoCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]),
  returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
  autoCorrect: PropTypes.bool.isRequired,
  onEndEditing: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AuthInput;
