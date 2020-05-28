import React from "react";
import { TextInput } from "react-native";
import PropTypes from "prop-types";
import constants from "../constants";
import styles from "../styles";

const SearchBar = ({ onChange, value, onSubmit }) => (
  <TextInput
    style={{
      width: constants.width - 40,
      height: 30,
      backgroundColor: styles.lightGrayColor,
      padding: 10,
      borderRadius: 5,
      textAlign: "center",
    }}
    returnKeyType="search"
    value={value}
    onChange={onChange}
    onEndEditing={onSubmit}
    placeholder={"Search"}
    placeholderTextColor={styles.darkGrayColor}
  />
);

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
