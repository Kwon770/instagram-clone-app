import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Camera } from "expo";
import * as Permissions from "expo-permissions";
import styled from "styled-components";
import Loader from "../../components/Loader";
import constants from "../../constants";

const View = styled.View`
  flex: 1;
  background-color: white;
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermissions, setHasPermissions] = useState(false);

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status == "granted") {
        setHasPermissions(true);
        getPhotos();
      }
    } catch (e) {
      console.log(e);
      setHasPermissions(false);
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          {hasPermissions ? (
            <Camera
              style={{ width: constants.width, height: constants.height }}
            />
          ) : null}
        </View>
      )}
    </View>
  );
};
