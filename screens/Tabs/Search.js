import React from "react";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";
import useInput from "../../hooks/useInput";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

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
