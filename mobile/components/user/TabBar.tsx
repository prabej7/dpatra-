import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View, Text } from "../Themed";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import {
    Feather,
    MaterialIcons,
    Ionicons,
    FontAwesome5,
} from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Colors from "@/constants/Colors"


interface Props extends BottomTabBarProps { }

interface IconProps {
    focused: boolean;
    color: string;
    size: number;
}

const TabBar: React.FC<Props> = ({ state, descriptors, navigation }) => {
    const icons: Record<string, (props: IconProps) => JSX.Element> = {
        index: (props) => <Feather name="home" size={25} color={props.color} />,
        documents: (props) => (
            <MaterialIcons name="dynamic-feed" size={25} color={props.color} />
        ),
        qr: (props) => <MaterialCommunityIcons name="qrcode-scan" size={24} color={props.color} />,
        transactions: (props) => (
            <Ionicons name="receipt-outline" size={25} color={props.color} />
        ),
        account: (props) => (
            <Feather name="user" size={24} color={props.color} />
        ),
    };

    return (
        <View style={styles.navBar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                const label =
                    typeof options.tabBarLabel === "string"
                        ? options.tabBarLabel
                        : typeof options.tabBarLabel === "function"
                            ? options.tabBarLabel({
                                focused: state.index === index,
                                color: isFocused ? Colors.light.primary : Colors.light.text,
                                position: "below-icon",
                                children: route.name,
                            })
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                const IconComponent = icons[route.name]; // Get the correct icon function

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabBarItem}
                    >
                        {IconComponent && (
                            <IconComponent
                                focused={isFocused}
                                color={isFocused ? Colors.light.primary : Colors.light.text }
                                size={25}
                            />
                        )}
                        <Text
                            style={{
                                color: isFocused ? Colors.light.primary  : Colors.light.text ,
                                fontFamily: "Regular",
                            }}
                        >
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default TabBar;

const styles = StyleSheet.create({
    navBar: {
        position: "absolute",
        bottom: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 25,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
    },
    tabBarItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});