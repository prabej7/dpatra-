import colors from '@/constants/Colors';
import useUserStore from '@/store/useUser';
import { View, StyleSheet, Text } from 'react-native';
import { calculateExpenseAndIncome } from './calc';

const IncomeExpenses: React.FC = () => {
  const { user } = useUserStore();

  let transaction;
  if (user?.transactions && user) {
    transaction = calculateExpenseAndIncome(user.transactions, user?.fullName);
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.head}>
          <Text style={styles.name}>Income</Text>
          <Text style={styles.amount}>Rs. {transaction?.income.amount}</Text>
        </View>
        <View>
          <Text style={styles.transactions}>
            - Transactions - {transaction?.income.transactions}
          </Text>
        </View>
      </View>
      <View>
        <View style={styles.head}>
          <Text style={styles.name}>Expenses</Text>
          <Text style={styles.amount}>Rs. {transaction?.expenses.amount}</Text>
        </View>
        <View>
          <Text style={styles.transactions}>
            - Transactions - {transaction?.expenses.transactions}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default IncomeExpenses;

const styles = StyleSheet.create({
  container: {
    borderColor: '#a4a4a4',
    borderWidth: 0.2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingVertical: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  name: {
    fontFamily: 'Medium',
    fontSize: 18,
    color: colors.light.text,
  },
  amount: {
    fontFamily: 'Bold',
    fontSize: 18,
    color: colors.light.text,
  },
  transactions: {
    fontFamily: 'Regular',
    fontSize: 16,
    color: '#a4a4a4',
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
