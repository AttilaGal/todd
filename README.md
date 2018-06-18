# Todd
[![Semver](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=0.1.0&x2=0)](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=0.1.0&x2=0)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)


A minimalistic helper library for making cli apps.

![alt text](https://github.com/AttilaGal/todd/raw/master/todd.jpg "Todd picture")


Todd has been named after the Breaking Bad character. Todd is a simple guy (or library in this case), he just asks some questions and gets things done.



## Installation
```
npm i --save todd
```
There are 2 ways you can use todd, either with [callbacks](#usage-with-callbacks) or with [promises](#usage-with-promises).

## Usage with callbacks
Callbacks are ideal, if you don't want to perform extra checks for the response given. The callback will be called directly if the matching option was typed in the console.
### ask something with fixed answers (options)
```javascript
import { ask } from 'todd';

ask({
  question: 'Do you really want us coming back mrs. White?',
  options: [
    {
      index: 1, // number: is used for sorting the different options
      text: 'Get out, leave us alone!', // string: will be printed as the option
      callback: (err, res) => { // function: will be triggered if the user enters 1
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
Answer Me!

```

## Usage with promises
Promises can help cut down on code, and also allows you to use async/await.

**When no callbacks are supplied, todd presumes you'll want a promise instead.**
### ask something with fixed answers (options)
```javascript
import { ask } from 'todd';

const answer = await ask({
  question: 'Do you really want us coming back mrs. White?',
  options: [
    {
      index: 1,
      text: 'Get out, leave us alone!'
    },
    {
      index: 2,
      text: 'I think Junior wants breakfast.'
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
The promise will only be resolved when the user answers with 1 of the expected answers

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

const answer = await askResponse({
  question: 'Who is the one that knocks?',
  footer: 'Answer me!' //optional, default is: Type in your answer and hit Enter
});
```
will generate the following output:
```
Who is the one that knocks?
Answer Me!

```
