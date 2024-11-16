import ChatScreen from '../..';
import { useLocalSearchParams } from 'expo-router';

export default function ChatHistoryScreen() {
    const { id } = useLocalSearchParams();
    return <ChatScreen chatId={id as string} />
}
