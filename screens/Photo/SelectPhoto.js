import React from "react";
import styled from "styled-components";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Text = styled.Text``;

export default () => (
  <View>
    <Text>Select Photo</Text>
  </View>
);
