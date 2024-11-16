import { View, Text, StyleSheet, ScrollView } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import useUserStore from "@/store/useUser";
import React from "react";

interface Props {
    no?: number; // optional prop to limit number of transactions
    title?: React.ReactNode;
}

const Transactions: React.FC<Props> = ({ no, title }) => {
    const { user } = useUserStore();

    // Use slice to limit the number of transactions displayed
    const displayedTransactions = no ? user?.transactions?.slice(0, no) : user?.transactions;

    return (
        <View style={styles.container}>
            {title ? title : <Text style={styles.title}>TRANSACTIONS</Text>}
            <View style={styles.transactions}>
                {displayedTransactions?.map(([_,transaction]) => (
                    <View key={transaction.id}>
                        {transaction.to.fullName === user?.fullName ? (
                            <View style={styles.transaction}>
                                <Ionicons name="add-circle-outline" size={36} color="#5EA083" />
                                <View style={styles.info}>
                                    <Text style={styles.purpose}>{transaction.purpose}</Text>
                                    <Text style={styles.date}>{new Date(transaction.createdAt).toLocaleDateString()}</Text>
                                </View>
                            </View>
                        ) : (
                            <View style={styles.transaction}>
                                <AntDesign
                                    name="minuscircleo"
                                    style={{ paddingLeft: 6 }}
                                    size={29}
                                    color="#A05E5F"
                                />
                                <View style={styles.info}>
                                    <Text style={styles.purpose}>{transaction.purpose}</Text>
                                    <Text style={styles.date}>
                                        {new Date(transaction.createdAt).toLocaleDateString()}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
};

export default Transactions;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 24
    },
    title: {
        color: '#a4a4a4',
        fontFamily: 'Medium',
        fontSize: 16
    },
    transactions: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24
    },
    transaction: {
        display: 'flex',
        flexDirection: 'row',
        gap: 12
    },
    info: {},
    purpose: {
        fontFamily: 'SemiBold',
        fontSize: 16
    },
    date: {
        fontFamily: 'Regular',
        fontSize: 14,
        color: '#a4a4a4'
    },
});
