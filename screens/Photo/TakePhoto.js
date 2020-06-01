import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity, Platform } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import styled from "styled-components";
import Loader from "../../components/Loader";
import constants from "../../constants";
import styles from "../../styles";

const View = styled.View`
  flex: 1;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const Button = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border: 10px solid ${styles.lightGrayColor};
`;

export default ({ navigation }) => {
  const cameraRef = useRef();
  const [canTakePhoto, setCanTakePhoto] = useState(true);
  const [loading, setLoading] = useState(true);
  const [hasPermissions, setHasPermissions] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const takePhoto = async () => {
    if (!canTakePhoto) {
      return;
    }

    try {
      setCanTakePhoto(false);
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 1,
      });
      const asset = await MediaLibrary.createAssetAsync(uri);
      navigation.navigate("UploadPhoto", { photo: asset });
    } catch (e) {
      console.log(e);
      setCanTakePhoto(true);
    }
  };
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
        <>
          <Camera
            ref={cameraRef}
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
          <View>
            <TouchableOpacity onPress={takePhoto} disabled={!canTakePhoto}>
              <Button />
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </View>
  );
};
