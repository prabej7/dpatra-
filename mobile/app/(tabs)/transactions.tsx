import { View } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { Transactions as TransactionTable } from "@/components/home";
const Transactions: React.FC = () => {
  return (
    <View style={styles.container}>
      <TransactionTable />
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    padding: 48,
    height: "100%",
  },
});
