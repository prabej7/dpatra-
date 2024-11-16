import { View } from '@/components/Themed';
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  BarcodeScanningResult,
} from 'expo-camera';
import { useState } from 'react';
import colors from '@/constants/Colors';
import { Text, StyleSheet } from 'react-native';
const QR: React.FC = () => {
  const [isQR, setQR] = useState<boolean>(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [accountID, setAccoundID] = useState<number | undefined>(undefined);
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

export default QR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.light.text,
    textAlign: 'center',
    fontFamily: 'Bold',
    paddingVertical: 24,
    fontSize: 28,
  },
});
