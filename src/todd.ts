import {
  ToddPrompt,
  ToddPromptSimple,
} from './models';
import { createInterface, ReadLine } from 'readline';

export function ask(prompt: ToddPrompt): void {
  console.log(prompt.question);
  printPrompts(prompt);
  const rl = getReadInterface();
  const footer = prompt.footer || 'Choose one of the options and hit Enter';
  const answerHandler = getAnswerHandler(rl, prompt);
  rl.question(footer, answerHandler);
}

export function askResponse(prompt: ToddPromptSimple): void {
  console.log(prompt.question);
  const rl = getReadInterface();
  const footer = prompt.footer || 'Choose one of the options and hit Enter' + '\n';
  const answerHandler = getResponseHandler(rl, prompt);
  rl.question(footer, answerHandler);
}

const getAnswerHandler = (rl: ReadLine, prompt: ToddPrompt) => (answer: string) => {
  rl.close();
  const chosenPrompt = prompt.options.find(p => p.index.toString() === answer);
  if (!chosenPrompt) {
    console.log("I didn't quite get that.\n");
    return ask(prompt);
  }
  return chosenPrompt.cb(null, answer)
};

const getResponseHandler = (rl: ReadLine, prompt: ToddPromptSimple) => (answer: string) => {
  rl.close();
  return prompt.callback(null, answer)
};

function getReadInterface() {
  return createInterface({
    input: process.stdin,
    output: process.stdout
  })
}

function printPrompts(prompts: ToddPrompt): void {
  prompts.options
    .sort((a, b) => a.index - b.index)
    .forEach(p => console.log(`${p.index}) ${p.text}`))
}