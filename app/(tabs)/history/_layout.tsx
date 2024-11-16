import { Stack } from 'expo-router/stack';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Colors } from '@/constants/Colors';

export default function HistoryLayout() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Stack>
                <Stack.Screen
                name="index"
                options={{
                    title: "History",
                }} />
                <Stack.Screen
                name="chat/[id]"
                options={{
                title: 'Chat History',
                }}
                />
            </Stack>
        </QueryClientProvider>
    );
}
