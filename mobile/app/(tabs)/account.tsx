import { View } from "@/components/Themed";
import { StyleSheet, Text } from "react-native";
import { useUserStore } from "@/store";
import { Button, H3, Input } from "tamagui";
import Colors from "@/constants/Colors";
import { useState } from "react";
import axios from "axios";
import { api } from "@/constants/api";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import useAuth from "@/hooks/useAuth";
import useLocalAuth from "@/components/user/useLocalAuth";
const Account: React.FC = () => {
  const { handleBiometricAuth } = useLocalAuth();
  const [isLoading, setLoading] = useState<boolean>(false);
  const { user } = useUserStore();
  const [userid, setuserid] = useState<string>("");
  const { getItem } = useAsyncStorage("token");
  const [error, setError] = useState<string>("");
  const { fetchUser } = useAuth();
  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    const isAuthenticated = await handleBiometricAuth();
    if (isAuthenticated)
      try {
        const { status } = await axios.post(`${api}/add-access`, {
          token: await getItem(),
          accessToken: userid,
        });
        if (status == 200) {
          setuserid("");
          return fetchUser();
        }
      } catch (error) {
        setError("Something went wrong!");
        console.log(error);
      } finally {
        setLoading(false);
      }
  };
  return (
    <View style={style.container}>
      <H3 color={Colors.light.primary}>Account</H3>
      <View>
        <Text style={style.text}>ID: {user?.id}</Text>
        <Text style={style.text}>Full Name: {user?.fullName}</Text>
        <Text style={style.text}>Date of Birth: {user?.dob}</Text>
        <Text style={style.text}>Gender: {user?.gender}</Text>
        <Text style={style.text}>Citizenship no.: {user?.czid}</Text>
      </View>
      <View
        style={{
          marginTop: 12,
        }}
      >
        <H3 color={Colors.light.primary}>Access Controls</H3>
        {error && <Text style={{ color: "red" }}>{error}</Text>}
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginTop: 12,
          }}
        >
          <Input
            placeholder="Account ID"
            value={userid}
            onChangeText={setuserid}
          />
          <Button
            disabled={isLoading}
            style={{
              backgroundColor: Colors.light.primary,
              color: Colors.light.white,
            }}
            onPress={handleSubmit}
          >
            {isLoading ? "Adding..." : "Add"}
          </Button>
        </View>
        <Text></Text>
        <View
          style={{
            marginTop: 12,
          }}
        >
          {user?.access.map((a, i) => {
            return (
              <Text key={i} style={style.text}>
                {i + 1}. {a}
              </Text>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Account;

const style = StyleSheet.create({
  container: {
    height: "100%",
    padding: 48,
  },
  text: {
    fontFamily: "Regular",
  },
});
