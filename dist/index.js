"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const todd_1 = require("./todd");
__export(require("./todd"));
exports.default = {
    ask: todd_1.ask,
    askResponse: todd_1.askResponse
};
const question = todd_1.askResponse({
    question: 'What\'s your favorite color?'
});
question.then(res => {
    console.log('your answer is: ' + res);
});
//# sourceMappingURL=index.js.map