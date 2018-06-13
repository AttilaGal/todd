import {
  ToddPrompt,
  ToddPromptSimple,
  ToddType,
} from './models';
import { createInterface, ReadLine, ReadLineOptions } from 'readline';

export function ask(prompt: ToddPrompt): void {
  console.log(prompt.question);
  printPrompts(prompt);
  todd(ToddType.Options, prompt);
}

export function askResponse(prompt: ToddPromptSimple): void {
  console.log(prompt.question);
  todd(ToddType.Response, prompt);
}

function todd(type: ToddType, prompt: ToddPrompt | ToddPromptSimple) {
  const rl = getReadInterface();
  const footer = prompt.footer || 'Choose one of the options and hit Enter' + '\n';
  const answerHandler = getAnswerHandler(type, rl, prompt);
  rl.question(footer, answerHandler);
}

const getAnswerHandler = (type: ToddType, rl: ReadLine, prompt: ToddPrompt | ToddPromptSimple) => {
  if (type === ToddType.Response) {
    return getAnswerHandlerForResponse(rl, <ToddPromptSimple> prompt);
  }
  return getAnswerHandlerForOptions(rl, <ToddPrompt> prompt);
}

const getAnswerHandlerForOptions = (rl: ReadLine, prompt: ToddPrompt) => (answer: string) => {
  rl.close();
  const chosenPrompt = prompt.options.find(p => p.index.toString() === answer);
  if (!chosenPrompt) {
    console.log("I didn't quite get that.\n");
    return ask(prompt);
  }
  return chosenPrompt.callback(null, answer)
};

const getAnswerHandlerForResponse = (rl: ReadLine, prompt: ToddPromptSimple) => (answer: string) => {
  rl.close();
  return prompt.callback(null, answer)
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