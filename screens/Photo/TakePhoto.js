import React, { useState, useEffect } from "react";
import { TouchableOpacity, Platform } from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import styled from "styled-components";
import Loader from "../../components/Loader";
import constants from "../../constants";
import styles from "../../styles";

const View = styled.View`
  flex: 1;
  background-color: white;
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermissions, setHasPermissions] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status == "granted") {
        setHasPermissions(true);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setHasPermissions(false);
    }
  };
  const toggleCameraType = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : hasPermissions ? (
        <Camera
          type={cameraType}
          style={{
            width: constants.width,
            height: constants.height / 2,
            justifyContent: "flex-end",
            padding: 20,
          }}
        >
          <TouchableOpacity onPress={toggleCameraType}>
            <Ionicons
              name={
                Platform.OS === "ios"
                  ? "ios-reverse-camera"
                  : "md-reverse-camera"
              }
              size={28}
              color={styles.lightGrayColor}
            />
          </TouchableOpacity>
        </Camera>
      ) : null}
    </View>
  );
};
