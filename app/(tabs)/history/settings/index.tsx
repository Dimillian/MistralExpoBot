import { Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import Stack from 'expo-router/stack';

export default function SettingsScreen() {
    return (
        <ThemedView>
            <Stack.Screen
            options={{
                title: 'Settings',
            }}
            />
            <Text>Setting Screen</Text>
        </ThemedView>
    );
}
