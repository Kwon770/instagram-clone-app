import React from "react";
import styled from "styled-components";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

export default ({ route }) => (
  <View>
    <Text>{route.params.photo.uri}</Text>
  </View>
);
