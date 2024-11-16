import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
import { BlurView } from '@react-native-community/blur'; // Import BlurView

interface InputBarProps {
    inputText: string;
    setInputText: (text: string) => void;
    sendMessage: () => void;
    isSending: boolean;
    textInputRef: React.RefObject<TextInput>;
}

export const InputBar: React.FC<InputBarProps> = ({ inputText, setInputText, sendMessage, isSending, textInputRef }) => (
    <View style={styles.inputContainer}>
        <BlurView style={styles.blurView} blurType="dark" blurAmount={10}>
            <TextInput
                ref={textInputRef}
                placeholder="Enter your message"
                placeholderTextColor="white"
                style={styles.textInput}
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={sendMessage}
                returnKeyType="send"
                editable={!isSending}
            />
            <TouchableOpacity onPress={sendMessage} disabled={isSending || inputText.trim() === ''} style={styles.sendButton}>
                <Icon name="arrow-up" size={24} color={isSending || inputText.trim() === '' ? 'gray' : 'white'} />
            </TouchableOpacity>
        </BlurView>
    </View>
);

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    blurView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'transparent', // Ensure background is transparent
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        color: 'white',
        borderColor: 'gray',
        padding: 10,
        borderRadius: 5,
    },
    sendButton: {
        padding: 10,
    },
});
