"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = require("readline");
function ask(prompt) {
    console.log(prompt.question);
    printPrompts(prompt);
    const rl = getReadInterface();
    const footer = prompt.footer || 'Choose one of the options and hit Enter';
    const answerHandler = getAnswerHandler(rl, prompt);
    rl.question(footer, answerHandler);
}
exports.ask = ask;
function askResponse(prompt) {
    console.log(prompt.question);
    const rl = getReadInterface();
    const footer = prompt.footer || 'Choose one of the options and hit Enter' + '\n';
    const answerHandler = getResponseHandler(rl, prompt);
    rl.question(footer, answerHandler);
}
exports.askResponse = askResponse;
const getAnswerHandler = (rl, prompt) => (answer) => {
    rl.close();
    const chosenPrompt = prompt.options.find(p => p.index.toString() === answer);
    if (!chosenPrompt) {
        console.log("I didn't quite get that.\n");
        return ask(prompt);
    }
    return chosenPrompt.cb(null, answer);
};
const getResponseHandler = (rl, prompt) => (answer) => {
    rl.close();
    return prompt.callback(null, answer);
};
function getReadInterface() {
    return readline_1.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}
function printPrompts(prompts) {
    prompts.options
        .sort((a, b) => a.index - b.index)
        .forEach(p => console.log(`${p.index}) ${p.text}`));
}
//# sourceMappingURL=todd.js.map