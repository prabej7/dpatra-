import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { io, Socket } from "socket.io-client";
import useAuth from "@/hooks/useAuth";
import { Head, IncomeExpenses, Transactions } from "@/components/home";
import Colors from "@/constants/Colors";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Alert, PaymentRequest } from "@/components/user";
import useLocalAuth from "@/components/user/useLocalAuth";
import axios from "axios";
import { api } from "@/constants/api";
export interface PayReq {
  amount: number;
  purpose: string;
  receiver: string;
  requester: {
    id: string;
    fullName: string;
  };
}
// Replace 'YOUR_SERVER_URL' with your actual server URL
const SERVER_URL = "http://192.168.43.121:5000/";

export default function TabOneScreen() {
  useAuth();
  const { handleBiometricAuth } = useLocalAuth();
  const { getItem } = useAsyncStorage("token");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [req, setReq] = useState<PayReq | undefined>();
  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(SERVER_URL, { transports: ["websocket"] });
    setSocket(newSocket);

    const setupSocket = async () => {
      const token = await getItem();
      if (token) {
        newSocket.emit("id", token);
      }
    };

    newSocket.on("connect", setupSocket);
    newSocket.on("receive-pay-request", (data: PayReq) => {
      setReq(undefined);
      console.log(data);
      setReq(data);
    });
    // Cleanup when component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleAccept = async () => {
    if (await handleBiometricAuth()) {
      try {
        const { status } = await axios.post(`${api}/perform-transaction`, {
          to: String(req?.requester.id),
          from: req?.receiver,
          amount: String(req?.amount),
          purpose: req?.purpose,
        });

        if (status == 200) {
          Alert({
            title: "Info",
            description: "Payment done successfully!",
            open: true,
            onClick: () => {},
          });

          socket?.emit("pay-accept", { id: req?.requester.id });

          Alert({
            title: "Info",
            description: "Payment Failed",
            open: true,
            onClick: () => {},
          });
        }
        setReq(undefined);
      } catch (error) {
        Alert({
          title: "Info",
          description: "Payment Failed",
          open: true,
          onClick: () => {},
        });
      } finally {
        setReq(undefined);
      }
    }
  };

  const handleDecline = () => {
    socket?.emit("pay-decline", req?.requester.id);
    setReq(undefined);
  };

  return (
    <View style={styles.container}>
      {req && (
        <>
          <PaymentRequest
            onAccept={handleAccept}
            onDeny={handleDecline}
            request={req}
          />
        </>
      )}
      <Head />
      <IncomeExpenses />
      <Transactions no={3} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 48,
  },
});
