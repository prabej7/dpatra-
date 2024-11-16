import { View, Text, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Button } from 'tamagui';
import colors from '@/constants/Colors';
import useUserStore from '@/store/useUser';
import { TransferFundsDialogue } from '../user';
const Header: React.FC = () => {
  const { user } = useUserStore();
  return (
    <View>
      <View style={styles.topHead}>
        <Text style={styles.name}>Hi, {user?.fullName}</Text>
        <Feather name="user" size={24} color="black" />
      </View>
      <View style={styles.bottomHead}>
        <View style={styles.balance}>
          <Text style={styles.currentBalance}>Current Balance</Text>
          <Text style={styles.balanceText}>Rs. {Number(user?.balance)}</Text>
        </View>
        <View style={styles.options}>
          <Button
            style={{
              backgroundColor: colors.light.primary,
              color: '#ffffff',
              borderRadius: 50,
              paddingHorizontal: 24,
            }}
          >
            ADD MONEY
          </Button>
          <TransferFundsDialogue
            button={
              <Button
                style={{
                  backgroundColor: colors.light.primary,
                  color: '#ffffff',
                  borderRadius: 50,
                  paddingHorizontal: 24,
                }}
              >
                TRANSFER
              </Button>
            }
          />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  name: {
    fontFamily: 'Medium',
    fontSize: 20,
  },
  topHead: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balance: {},
  bottomHead: {
    paddingVertical: 48,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 24,
  },
  currentBalance: {
    fontFamily: 'Regular',
    fontSize: 16,
    color: '#a4a4a4',
    textAlign: 'center',
  },
  balanceText: {
    fontFamily: 'InterBold',
    textAlign: 'center',
    fontSize: 42,
    color: colors.light.text,
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
});
