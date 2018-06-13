export interface ToddCallback {
    (error: Error, value?: any): void;
}
export interface ToddOption {
    text: string;
    cb: ToddCallback;
    index: number;
}
export interface ToddPrompt {
    question: string;
    options: ToddOption[];
    footer?: string;
}
export interface ToddPromptSimple {
    question: string;
    callback: ToddCallback;
    footer?: string;
}
