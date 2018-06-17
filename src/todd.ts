import {
  PromiseHandlers,
  ToddPrompt,
  ToddPromptSimple,
  ToddType,
} from './models';
import { createInterface, ReadLine } from 'readline';

export function ask(prompt: ToddPrompt): Promise<string> | void {
  return askInternal(prompt, null);
}

function askInternal(prompt: ToddPrompt, promiseHandlers: PromiseHandlers): Promise<string> | void {
  console.log(prompt.question);
  printPrompts(prompt);
  const containsCallback = prompt.options.find(o => !!o.callback);
  if (!containsCallback) {
    return !!promiseHandlers
      ? todd(ToddType.Options, prompt, promiseHandlers)
      : new Promise((resolve, reject) => {
        todd(ToddType.Options, prompt, { resolve, reject });
      });
  }
  return todd(ToddType.Options, prompt);
}

export function askResponse(prompt: ToddPromptSimple): Promise<string> | void {
  console.log(prompt.question);
  if (!!prompt.callback) {
    return new Promise((resolve, reject) => {
      todd(ToddType.Response, prompt, { resolve, reject });    
    });
  }
  return todd(ToddType.Response, prompt);
}

const defaultFooters = {
  [ToddType.Options]: 'Choose one of the options and hit Enter',
  [ToddType.Response]: 'Type in your answer and hit Enter'
}

function todd(
  type: ToddType, 
  prompt: ToddPrompt | ToddPromptSimple, 
  promiseHandlers?: PromiseHandlers
): Promise<string> | void {
  const rl = getReadInterface();
  const footer = prompt.footer || defaultFooters[type] + '\n';
  const answerHandler = getAnswerHandler(type, rl, prompt, promiseHandlers);
  rl.question(footer, answerHandler);
}

const getAnswerHandler = (
  type: ToddType,
  rl: ReadLine,
  prompt: ToddPrompt | ToddPromptSimple,
  promiseHandlers?: PromiseHandlers
) => {
  if (type === ToddType.Response) {
    return getAnswerHandlerForResponse(rl, <ToddPromptSimple>prompt, promiseHandlers);
  }
  return getAnswerHandlerForOptions(rl, <ToddPrompt>prompt, promiseHandlers);
}

const getAnswerHandlerForOptions = (rl: ReadLine, prompt: ToddPrompt, promiseHandlers?: PromiseHandlers) => (answer: string) => {
  rl.close();
  const chosenPrompt = prompt.options.find(p => p.index.toString() === answer);
  if (!chosenPrompt) {
    console.log("I didn't quite get that.\n");
    return askInternal(prompt, promiseHandlers);
  }
  if (promiseHandlers) {
    return promiseHandlers.resolve(answer);
  }
  return chosenPrompt.callback(null, answer)
};

const getAnswerHandlerForResponse = (rl: ReadLine, prompt: ToddPromptSimple, promiseHandlers?: PromiseHandlers) => (answer: string) => {
  rl.close();
  if (promiseHandlers) {
    return promiseHandlers.resolve(answer);
  }
  return prompt.callback(null, answer);
};

const getReadInterface = () => createInterface({
  input: process.stdin,
  output: process.stdout
});

function printPrompts(prompts: ToddPrompt): void {
  prompts.options
    .sort((a, b) => a.index - b.index)
    .forEach(p => console.log(`${p.index}) ${p.text}`))
}