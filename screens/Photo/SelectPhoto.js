import React, { useState, useEffect } from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components";
import Loader from "../../components/Loader";
import constants from "../../constants";
import styles from "../../styles";

const View = styled.View`
  flex: 1;
  background-color: white;
`;

const Button = styled.TouchableOpacity`
  width: 100px;
  height: 30px;
  position: absolute;
  right: 5px;
  top: 15px;
  background-color: ${styles.blueColor};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermissions, setHasPermissions] = useState(false);
  const [selected, setSelected] = useState();
  const [allPhotos, setAllPhotos] = useState();

  const changeSelected = (photo) => {
    setSelected(photo);
  };
  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync();
      const [firstPhoto] = assets;
      setSelected(firstPhoto);
      setAllPhotos(assets);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status == "granted") {
        setHasPermissions(true);
        getPhotos();
      }
    } catch (e) {
      console.log(e);
      setHasPermissions(false);
    }
  };
  const handleSelected = () => {
    navigation.navigate("UploadPhoto", { photo: selected });
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
          <Image
            style={{ width: constants.width, height: constants.height / 2 }}
            source={{ uri: selected.uri }}
          />

          <Button onPress={handleSelected}>
            <Text>Upload</Text>
          </Button>

          <ScrollView
            contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
          >
            {allPhotos.map((photo) => (
              <TouchableOpacity
                key={photo.id}
                onPress={() => changeSelected(photo)}
              >
                <Image
                  source={{ uri: photo.uri }}
                  style={{
                    width: constants.width / 3,
                    height: constants.height / 6,
                    opacity: photo.id === selected.id ? 0.5 : 1,
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      ) : null}
    </View>
  );
};
