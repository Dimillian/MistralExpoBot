export interface IConversation {
    id: string;
    preview: string;
    date: Date;
}

export class Conversation implements IConversation {
    id: string;
    preview: string;
    date: Date;

    constructor(id: string, preview: string, date: Date) {
        this.id = id;
        this.preview = preview;
        this.date = date
    }
}
