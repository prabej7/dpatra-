import { api } from "@/constants/api";
import { useUserStore } from "@/store";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

const useAuth = () => {
  const { getItem, removeItem } = useAsyncStorage("token");
  const { push } = useRouter();
  const { setUser } = useUserStore();
  const [isUserLoading, setUserLoading] = useState<boolean>(false);
  const fetchUser = async () => {
    const token = await getItem();

    if (!token) {
      return push("/(auth)");
    }
    setUserLoading(true);
    try {
      const { status, data } = await axios.post(`${api}/getuser`, {
        token: token,
        accessToken: token,
      });

      setUser(JSON.parse(data.user));

      if (status != 200) {
        await removeItem();
        return push("/(auth)");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { fetchUser, isUserLoading };
};

export default useAuth;
