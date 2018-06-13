"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const readline_1 = require("readline");
function ask(prompt) {
    console.log(prompt.question);
    printPrompts(prompt);
    todd(models_1.ToddType.Options, prompt);
}
exports.ask = ask;
function askResponse(prompt) {
    console.log(prompt.question);
    todd(models_1.ToddType.Response, prompt);
}
exports.askResponse = askResponse;
const defaultFooters = {
    [models_1.ToddType.Options]: 'Choose one of the options and hit Enter',
    [models_1.ToddType.Response]: 'Type in your answer and hit Enter'
};
function todd(type, prompt) {
    const rl = getReadInterface();
    const footer = prompt.footer || defaultFooters[type] + '\n';
    const answerHandler = getAnswerHandler(type, rl, prompt);
    rl.question(footer, answerHandler);
}
const getAnswerHandler = (type, rl, prompt) => {
    if (type === models_1.ToddType.Response) {
        return getAnswerHandlerForResponse(rl, prompt);
    }
    return getAnswerHandlerForOptions(rl, prompt);
};
const getAnswerHandlerForOptions = (rl, prompt) => (answer) => {
    rl.close();
    const chosenPrompt = prompt.options.find(p => p.index.toString() === answer);
    if (!chosenPrompt) {
        console.log("I didn't quite get that.\n");
        return ask(prompt);
    }
    return chosenPrompt.callback(null, answer);
};
const getAnswerHandlerForResponse = (rl, prompt) => (answer) => {
    rl.close();
    return prompt.callback(null, answer);
};
const getReadInterface = () => readline_1.createInterface({
    input: process.stdin,
    output: process.stdout
});
function printPrompts(prompts) {
    prompts.options
        .sort((a, b) => a.index - b.index)
        .forEach(p => console.log(`${p.index}) ${p.text}`));
}
//# sourceMappingURL=todd.js.map