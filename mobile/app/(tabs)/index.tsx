import { StyleSheet } from 'react-native';

import { View } from 'react-native';
import useAuth from '@/hooks/useAuth';
import { useUserStore } from '@/store';
import Colors from '@/constants/Colors';
import { Head, IncomeExpenses, Transactions } from '@/components/home';

export default function TabOneScreen() {
  useAuth();
  return (
    <View style={styles.container}>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
