import { StyleSheet, Platform, TextInput, KeyboardAvoidingView, View, Text, Button } from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Mistral } from "@mistralai/mistralai";
import { ThemedView } from '@/components/ThemedView';
import { MessageList } from '@/components/MessageList';
import { InputBar } from '@/components/InputBar';
import { Message, MessageRole } from '@/types/message';
import { Model, MODELS } from '@/types/models';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MenuView } from '@react-native-menu/menu';
import { Colors } from '@/constants/Colors';

interface ChatScreenProps {
    chatId?: string;
}

export default function ChatScreen({ chatId }: ChatScreenProps) {
    const [conversationId, setConversationId] = useState<string>(chatId || uuidv4());
    const [model, setModel] = useState<Model>(MODELS[0]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState<string>('');
    const [isSending, setIsSending] = useState<boolean>(false);
    const textInputRef = useRef<TextInput>(null);
    const mistral = new Mistral({
        apiKey: "YOUR_PAY_KEY_HERE",
    });
    const navigation = useNavigation();

    useEffect(() => {
        loadMessages();
    }, []);

    useEffect(() => {
        saveMessages();
    }, [messages]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                modelMenuButton()
            )
        });
    }, [navigation, model]);

    const loadMessages = async () => {
        try {
            const id = conversationId[0];
            const savedMessages = await AsyncStorage.getItem(`chatMessages-${id}`);
            if (savedMessages) {
                setMessages(JSON.parse(savedMessages));
            }
        } catch (error) {
            console.error("Failed to load messages", error);
        }
    };

    async function saveMessages(): Promise<void> {
        try {
            const id = conversationId[0];
            await AsyncStorage.setItem(`chatMessages-${id}`, JSON.stringify(messages));
        } catch (error) {
            console.error("Failed to save messages", error);
        }
    };

    async function getMistralResponse(message: string): Promise<string> {
        const chatHistory = messages.map(msg => ({
            content: msg.text,
            role: msg.role,
        }));

        const requestMessages = [
            ...chatHistory,
            {
                content: message,
                role: MessageRole.User,
            },
        ];

        const result = await mistral.chat.complete({
          model: model.id,
          messages: requestMessages.map(msg => ({
            ...msg,
            role: msg.role as "system" | "user" | "assistant" | "tool"
          })),
        });

        if (result.choices && result.choices.length > 0) {
            return result.choices[0].message.content ?? "";
        }
        return "";
    }

    const modelMenuButton = () => {
        return (
            <MenuView
            title="Mistral models"
            onPressAction={({ nativeEvent }) => {
                if (nativeEvent.event === 'new-chat') {
                    setConversationId(uuidv4());
                    setMessages([]);
                    setInputText('');
                } else {
                    setModel(MODELS.find(model => model.id == nativeEvent.event) || MODELS[0]);
                }
            }}
            actions={[
                ...MODELS.map((model) => ({
                    id: model.id,
                    title: model.title,
                    titleColor: '#46F289',
                    subtitle: model.description,
                    image: Platform.select({
                      ios: model.icon,
                      android: model.icon,
                    }),
                })),
                { id: 'new-chat', title: 'Start a New Chat', attributes: { destructive: true } }
            ]}
            shouldOpenOnLongPress={false}
          >
            <Button title={model.title} color={Colors.tint} />
          </MenuView>
        )
    }

    const sendMessage = async () => {
        if (inputText.trim()) {
            setIsSending(true);
            const newMessage: Message = new Message(inputText, MessageRole.User);
            const loadingMessage: Message = new Message("...", MessageRole.Tool);
            setMessages([...messages, newMessage, loadingMessage]);
            setInputText('');
            textInputRef.current?.focus();

            const response = await getMistralResponse(inputText);
            const mistralMessage: Message = new Message(response, MessageRole.Assistant);
            setMessages([...messages, newMessage, mistralMessage]);
            setIsSending(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <ThemedView style={styles.container}>
                <MessageList messages={messages} />
                <View style={styles.inputBarContainer}>
                    <InputBar
                        inputText={inputText}
                        setInputText={setInputText}
                        sendMessage={sendMessage}
                        isSending={isSending}
                        textInputRef={textInputRef}
                    />
                </View>
            </ThemedView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    inputBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
});
