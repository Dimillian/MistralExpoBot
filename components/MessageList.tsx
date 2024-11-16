import React, { useEffect, useRef } from 'react';
import { FlatList, StyleSheet, View, Image } from 'react-native';
import { Message } from '@/types/message';
import Markdown from 'react-native-markdown-display';

interface MessageListProps {
    messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    const flatListRef = useRef<FlatList<Message>>(null);

    const scrollToEnd = () => {
            setTimeout(() => {
                if (flatListRef.current) {
                    flatListRef.current.scrollToEnd({ animated: true });
                }
        }, 250);
    };

    return (
        <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={({ item, index }) => (
            <View style={styles.messageContainer}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={ index % 2 === 0 ? require('../assets/images/favicon.png') : require('../assets/images/mistral-logo.png')}
                        style={styles.avatar}
                    />
                    <View style={styles.threadLine} />
                </View>
                <View style={styles.message}>
                    <Markdown style={markdownStyles}>
                        {item.text}
                    </Markdown>
                </View>
            </View>
        )}
        keyExtractor={item => item.id}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContent}
        contentInset={{ bottom: 100 }}
        onContentSizeChange={scrollToEnd}
        keyboardDismissMode="interactive"
    />
);
}

const markdownStyles = StyleSheet.create({
    body: {color: 'white'},
    root: {color: 'white'},
    code_inline: {backgroundColor: '#333', color: 'white'},
    code_block: {backgroundColor: '#333', color: 'white'},
    fence: {backgroundColor: '#333', color: 'white'}
});

const styles = StyleSheet.create({
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 5,
    },
    avatar: {
        width: 20,
        height: 20,
        marginRight: 10,
        marginTop: 10,
    },
    avatarContainer: {
        alignItems: 'center',
    },
    threadLine: {
        width: 1,
        backgroundColor: 'gray',
        flex: 1,
        marginTop: 5,
        marginLeft: -8
    },
    message: {
        color: 'white',
        padding: 10,
        maxWidth: '80%',
        alignSelf: 'flex-start',
        marginBottom: 20,
        marginTop: -10,
        flex: 1,
    },
    messageListContent: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        marginBottom: 100,
    },
    messageList: {
        flex: 1,
        padding: 10,
    },
});
