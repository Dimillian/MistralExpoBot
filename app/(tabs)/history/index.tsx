import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Conversation } from '@/types/conversation';
import { useQuery } from '@tanstack/react-query';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { formatDistanceToNow } from 'date-fns';


export default function HistoryScreen() {

    const moreSections =  [
        { title: 'Settings', path: 'history/settings'},
        { title: 'About', path: 'about'}
    ]

    const fetchConversations = async (): Promise<Conversation[]> => {
        const keys = await AsyncStorage.getAllKeys();
        const conversationKeys = keys.filter(key => key.startsWith('chatMessages-'));
        const loadedConversations: Conversation[] = [];
        for (const key of conversationKeys) {
            const messagesString = await AsyncStorage.getItem(key);
            if (messagesString) {
                const messages = JSON.parse(messagesString);
                if (messages.length > 0) {
                    loadedConversations.push({
                        id: key.replace('chatMessages-', ''),
                        preview: messages[0].text,
                        date: messages[0].date,
                    });
                }
            }
        }
        loadedConversations.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        console.log(loadedConversations);
        return loadedConversations;
    };

    const { data: conversations = [] } = useQuery({
        queryKey: ['conversations'],
        queryFn: fetchConversations,
    });

    const renderConversation = ({ item }: { item: Conversation }) => (
        <Link
        key={item.id}
        href={{
            pathname: '/history/chat/[id]',
            params: { id: item.id },
        }}>
            <View style={styles.itemContainer}>
                <Image source={require('@/assets/images/mistral-logo.png')} style={styles.itemImage} />
                <View style={styles.itemTextContainer}>
                    <Text style={styles.itemText}
                          numberOfLines={1}
                          ellipsizeMode='tail'>{item.preview}</Text>
                    <Text style={styles.itemDate}>
                        {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
                </Text>
                </View>
            </View>
        </Link>
    );

    const renderMoreSection = ({ item }: { item: { title: string, path: string } }) => (
        <Link
            key={item.title}
            href={item.path}>
            <View style={styles.moreSectionContainer}>
                <Text style={styles.moreSectionText}>{item.title}</Text>
            </View>
        </Link>
    );

    return (
        <ThemedView style={styles.container}>
            <FlatList
                style={styles.list}
                data={conversations}
                renderItem={renderConversation}
                ListFooterComponent={() => (
                    <FlatList
                        data={moreSections}
                        renderItem={renderMoreSection}
                        keyExtractor={(item) => item.title}
                    />
                )}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    list: {
        flex: 1,
        paddingVertical: 16,
    },
    itemContainer: {
        flexDirection: "row",
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
     width: '100%'
    },
    itemTextContainer: {
        flexGrow: 1,
    },
    itemImage: {
        marginRight: 12,
        width: 24,
        height: 24,
    },
    itemText: {
        fontSize: 16,
        fontWeight: 'semibold',
        color: 'white',
        marginEnd: 10,
    },
    itemDate: {
        fontSize: 12,
        color: 'gray',
        paddingTop: 4,
    },
    moreSectionContainer: {
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    moreSectionText: {
        fontSize: 16,
        color: 'black',
    },
});
