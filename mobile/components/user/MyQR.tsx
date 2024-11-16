import { useUserStore } from "@/store";
import { View, Image, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import  colors  from "@/constants/Colors";
import QRCode from "react-native-qrcode-svg";
const MyQR: React.FC = () => {
  const { user } = useUserStore();
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <View style={styles.container}>
      {user ? (
        <View>
          <QRCode
            color={colors.light.text}
            backgroundColor={colors.light.white}
            size={200}
            value={user.id}
          />
        </View>
      ) : (
        <Text>Generating QR...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 250,
    width: 250,
    backgroundColor: colors.light.white,
    borderRadius: 25,
  },
  qrImage: {
    width: 200,
    height: 200,
    margin: 20,
  },
});

export default MyQR;
