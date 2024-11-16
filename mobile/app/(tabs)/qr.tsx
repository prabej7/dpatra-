import { View } from "@/components/Themed";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import { useState } from "react";
import { Button, H4, H5, H6 } from "tamagui";
import { TransferFundsDialogue } from "@/components/user";
import colors from "@/constants/Colors";
import { Text, StyleSheet } from "react-native";
import MyQR from "@/components/user/MyQR";

const QR: React.FC = () => {
  const [isQR, setQR] = useState<boolean>(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [accountID, setAccoundID] = useState<number | undefined>(undefined);
  if (!permission) {
    return <View style={styles.container}></View>;
  }
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <H4>Camera Permission</H4>
        <Text
          style={{
            fontFamily: "Regular",
          }}
        >
          We need your permission to show the camera.
        </Text>
        <Button
          style={{
            backgroundColor: colors.light.primary,
            color: colors.light.white,
            marginVertical: 12,
          }}
          onPress={requestPermission}
        >
          Grant Permission
        </Button>
      </View>
    );
  }
  const onScanned = ({ data }: BarcodeScanningResult) => {
    setAccoundID(Number(data));
  };
  return (
    <View style={styles.container}>
      <TransferFundsDialogue onClose={() => setAccoundID()} accNo={accountID} />
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={onScanned}
      >
        <Button
          style={{
            color: "white",
            backgroundColor: colors.light.primary,
            position: "absolute",
            bottom: 150,
            minWidth: 150,
          }}
          onPress={() => setQR(!isQR)}
        >
          {isQR ? "Scan QR" : "My QR"}
        </Button>
        {isQR && (
          <View>
            <Text style={styles.title}>Scan To Pay</Text>
            <MyQR />
          </View>
        )}
      </CameraView>
    </View>
  );
};

export default QR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.light.text,
    textAlign: "center",
    fontFamily: "Bold",
    paddingVertical: 24,
    fontSize: 28,
  },
});
