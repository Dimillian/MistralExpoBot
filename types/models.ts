export interface IModel {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export class Model implements IModel {
    id: string;
    title: string;
    description: string;
    icon: string;

    constructor(id: string, title: string, description: string, icon: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.icon = icon;
    }
}

export const MODELS: Model[] = [
    new Model("mistral-small-latest", "Mistral Small", "Designed to be fast and efficient.", "robotic.vacuum"),
    new Model("mistral-large-latest", "Mistral Large", "Designed to be accurate and efficient.", "plus.bubble"),
    new Model("codestral-latest", "CodeStral", "Designed for coding tasks.", "keyboard")
]
