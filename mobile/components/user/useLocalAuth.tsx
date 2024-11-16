import { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';


const BiometricAuth = () => {
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);

    // Check if hardware supports biometrics
    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
        })();
    }, []);

    const handleBiometricAuth = async () => {
        try {
            // Check for saved biometrics (fingerprints, facial recognition, etc.)
            const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
            if (!savedBiometrics) {
                return Alert.alert('No Biometrics Found', 'Please set up biometric authentication on your device.');
            }

            // Prompt the user for authentication
            const authResult = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Authenticate with Biometrics',
                fallbackLabel: 'Enter Password',
            });

            if (authResult.success) {
                return true;
            } else {
                return false
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred during authentication.');
            console.error(error);
        }
    };

    return { handleBiometricAuth };
};

export default BiometricAuth;