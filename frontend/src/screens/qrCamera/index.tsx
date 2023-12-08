import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  Camera,
  requestCameraPermissionsAsync,
  requestMicrophonePermissionsAsync,
  CameraType,
  FlashMode,
} from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as VideoThumbnails from "expo-video-thumbnails";
import { useIsFocused } from "@react-navigation/core";
import { Feather } from "@expo/vector-icons";

import styles from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/main";

import { useRoute } from '@react-navigation/native';


/**
 * Function that renders a component responsible showing
 * a view with the camera preview, recording videos, controling the camera and
 * letting the user pick a video from the gallery
 * @returns Functional Component
 */
const QRCodeScreen: React.FC = () => {
  // Access route and params from the route
  const { params } = useRoute();

  // Extract setVerified function from params
  const { setVerified } = params as { setVerified: React.Dispatch<React.SetStateAction<boolean>> };


  const [hasCameraPermissions, setHasCameraPermissions] = useState(false);
  const [hasAudioPermissions, setHasAudioPermissions] = useState(false);
  const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false);

  const [galleryItems, setGalleryItems] = useState<MediaLibrary.Asset[]>([]);

  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [cameraFlash, setCameraFlash] = useState(FlashMode.off);

  const [isCameraReady, setIsCameraReady] = useState(false);
  const isFocused = useIsFocused();

  const [QRCodeOverlay, setQRCodeOverlay] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    (async () => {
      const cameraStatus = await requestCameraPermissionsAsync();
      setHasCameraPermissions(cameraStatus.status == "granted");

      const audioStatus = await requestMicrophonePermissionsAsync();
      setHasAudioPermissions(audioStatus.status == "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermissions(galleryStatus.status == "granted");

      if (galleryStatus.status == "granted") {
        const userGalleryMedia = await MediaLibrary.getAssetsAsync({
          sortBy: ["creationTime"],
          mediaType: ["video"],
        });
        setGalleryItems(userGalleryMedia.assets);
      }
    })();
  }, []);

  const recordVideo = async () => {
    if (cameraRef) {
      try {
        const options = {
          maxDuration: 60,
          quality: Camera.Constants.VideoQuality["480"],
        };
        const videoRecordPromise = cameraRef.recordAsync(options);
        if (videoRecordPromise) {
          const data = await videoRecordPromise;
          const source = data.uri;
          // let sourceThumb = "undefined";
          let sourceThumb = await generateThumbnail(source);
          if (sourceThumb) {
            navigation.navigate("savePost", { source, sourceThumb });
          }
        }
      } catch (error) {
        console.log("error recording video");
        console.warn(error);
      }
    }
  };

  const stopVideo = async () => {
    if (cameraRef) {
      cameraRef.stopRecording();
    }
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) {
      const sourceThumb = await generateThumbnail(result.assets[0].uri);
      // let sourceThumb = "undefined";
      if (sourceThumb) {
        navigation.navigate("savePost", {
          source: result.assets[0].uri,
          sourceThumb,
        });
      }
    }
  };

  const generateThumbnail = async (source: string) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(source, {
        time: 5000,
      });
      return uri;
    } catch (e) {
      console.log("error generating thumbnail");
      console.warn(e);
    }
  };

  if (!hasCameraPermissions || !hasAudioPermissions || !hasGalleryPermissions) {
    return <View></View>;
  }

  return (
    <View style={styles.container}>
      <View style={
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#262034',
          width: '100%',
          height: 80,
        }
      }>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            position: 'absolute',
            left: 20,
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: '#262034',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1
          }}
        >
          <Feather name="arrow-left" size={36} color="white" />
        </TouchableOpacity>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: 'white',
          marginLeft: 20,
          top: 2
        }}>QR Code Scanner</Text>
      </View>


        <View style={{
          position: 'absolute',
          zIndex: 1,
          top: 260,
          left: 55,
          width: 300,
          height: 300,
          backgroundColor: 'gray',
          opacity: 0.5,
          borderRadius: 20
        }}>
        </View>

        <TouchableOpacity
          onPress={() => {
            setVerified(true);
            navigation.goBack();
          }}
          style={{
            position: 'absolute',
            zIndex: 1,
            top: 650,
            left: 150,
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: '#262034',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Feather name="check" size={40} color="#F23288" />
        </TouchableOpacity>

      {isFocused ? (
        <Camera
          ref={(ref) => setCameraRef(ref)}
          style={styles.camera}
          ratio={"16:9"}
          type={cameraType}
          flashMode={cameraFlash}
          onCameraReady={() => setIsCameraReady(true)}
        />
      ) : null}


    </View>
  );
}

export default QRCodeScreen;