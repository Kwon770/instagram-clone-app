import React from "react";
import styled from "styled-components";

const View = styled.View``;

const Text = styled.Text``;

export default ({ route }) => {
  return (
    <View>
      <Text>Photo ! {route.params.id}</Text>
    </View>
  );
};
