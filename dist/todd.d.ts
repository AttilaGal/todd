import { ToddPrompt, ToddPromptSimple } from './models';
export declare function ask(prompt: ToddPrompt): Promise<string> | void;
export declare function askResponse(prompt: ToddPromptSimple): Promise<string> | void;
