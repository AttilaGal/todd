# Todd

A minimalistic helper library for making cli apps.

Todd has been named after the Breaking Bad character. Todd is a simple guy (or library in this case), he just asks some questions and gets things done.

---

## Installation
```
npm i --save todd
```
---

## Usage

### ask something with fixed answers (options)
```javascript
import { ask } from 'todd';

todd.ask({
  question: 'Do you really want us coming back mrs. White?',
  options: [
    {
      index: 1,
      text: 'Get out, leave us alone!',
      callback: (err, res) => {
        // calback that's triggered when user types '1'
      }
    },
    {
      index: 2,
      text: 'I think Junior wants breakfast.',
      callback: (err, res) => {
        // calback that's triggered when user types '2'
      },
    }
  ],
  footer: 'Answer me!' //optional, default is: Choose one of the options and hit Enter
});
  
```

this will produce the following prompt: 

```
Do you really want us coming back mrs. White?
1) Get out, leave us alone!
2) I think Junior wants breakfast.
Choose one of the options and hit Enter
```
if you choose an answer that Todd doesn't understand, Todd will repeat the question.

```
Do you really want us coming back mrs. White?
1) Get out, leave us alone!
2) I think Junior wants breakfast.
Choose one of the options and hit Enter
3

I didn't quite get that.
Do you really want us coming back mrs. White?
1) Get out, leave us alone!
2) I think Junior wants breakfast.
Choose one of the options and hit Enter
```

### ask something with open response
```javascript
import { askresponse } from 'todd';

askResponse({
  question: 'Who is the one that knocks?',
  callback: (err, res) => {
    // callback that's triggered when the user hit's enter, res contains the typed input
  },
  footer: 'Answer me!' //optional, default is: Type in your answer and hit Enter
});
```
will generate the following output:
```
Who is the one that knocks?
Type in your answer and hit Enter

```
