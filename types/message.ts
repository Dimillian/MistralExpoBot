import { v4 as uuidv4 } from 'uuid';

export interface IMessage {
    id: string;
    text: string;
    role: MessageRole;
    date: Date;
}

export enum MessageRole {
    User = 'user',
    System = 'system',
    Assistant = 'assistant',
    Tool = 'tool'
}

export class Message implements IMessage {
    id: string;
    text: string;
    role: MessageRole;
    date: Date;

    constructor(text: string, role: MessageRole) {
        this.id = Message.newMessageId();
        this.text = text;
        this.role = role;
        this.date = new Date();
    }

    private static newMessageId(): string {
        return uuidv4();
    }
}
