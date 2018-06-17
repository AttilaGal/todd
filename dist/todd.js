"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const readline_1 = require("readline");
function ask(prompt) {
    return askInternal(prompt, null);
}
exports.ask = ask;
function askInternal(prompt, promiseHandlers) {
    console.log(prompt.question);
    printPrompts(prompt);
    const containsCallback = prompt.options.find(o => !!o.callback);
    if (!containsCallback) {
        return !!promiseHandlers
            ? todd(models_1.ToddType.Options, prompt, promiseHandlers)
            : new Promise((resolve, reject) => {
                todd(models_1.ToddType.Options, prompt, { resolve, reject });
            });
    }
    return todd(models_1.ToddType.Options, prompt);
}
function askResponse(prompt) {
    console.log(prompt.question);
    if (!!prompt.callback) {
        return new Promise((resolve, reject) => {
            todd(models_1.ToddType.Response, prompt, { resolve, reject });
        });
    }
    return todd(models_1.ToddType.Response, prompt);
}
exports.askResponse = askResponse;
const defaultFooters = {
    [models_1.ToddType.Options]: 'Choose one of the options and hit Enter',
    [models_1.ToddType.Response]: 'Type in your answer and hit Enter'
};
function todd(type, prompt, promiseHandlers) {
    const rl = getReadInterface();
    const footer = prompt.footer || defaultFooters[type] + '\n';
    const answerHandler = getAnswerHandler(type, rl, prompt, promiseHandlers);
    rl.question(footer, answerHandler);
}
const getAnswerHandler = (type, rl, prompt, promiseHandlers) => {
    if (type === models_1.ToddType.Response) {
        return getAnswerHandlerForResponse(rl, prompt, promiseHandlers);
    }
    return getAnswerHandlerForOptions(rl, prompt, promiseHandlers);
};
const getAnswerHandlerForOptions = (rl, prompt, promiseHandlers) => (answer) => {
    rl.close();
    const chosenPrompt = prompt.options.find(p => p.index.toString() === answer);
    if (!chosenPrompt) {
        console.log("I didn't quite get that.\n");
        return askInternal(prompt, promiseHandlers);
    }
    if (promiseHandlers) {
        return promiseHandlers.resolve(answer);
    }
    return chosenPrompt.callback(null, answer);
};
const getAnswerHandlerForResponse = (rl, prompt, promiseHandlers) => (answer) => {
    rl.close();
    if (promiseHandlers) {
        return promiseHandlers.resolve(answer);
    }
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