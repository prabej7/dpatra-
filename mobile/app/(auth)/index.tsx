import { Text, View } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import { Button, Input } from 'tamagui';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { api } from '@/constants/api';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import useAuth from '@/hooks/useAuth';
const index: React.FC = () => {
  const { setItem } = useAsyncStorage('token');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const { push } = useRouter();
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { status, data } = await axios.post(`${api}/login`, {
        userid: username,
        password,
      });
      if (status == 200) {
        setItem(data.token);
        push('/(tabs)');
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.heading}>
          Login to DPatra
        </Text>
        <View style={styles.form}>
          <Input placeholder="User ID" onChangeText={setUsername} />
          <Input
            secureTextEntry
            placeholder="Password"
            onChangeText={setPassword}
          />
          <Button style={styles.btn} onPress={handleSubmit}>
            Login
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    width: 250,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  btn: {},
  heading: {
    fontSize: 32,
    paddingVertical: 12,
    fontWeight: 'bold',
  },
});

export default index;
