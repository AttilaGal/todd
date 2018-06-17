import {
  ask,
  askResponse
} from './todd';

export * from './todd';
export default {
  ask,
  askResponse
}

const question = <Promise<string>> askResponse({
  question: 'What\'s your favorite color?'
});
question.then(res => {
  console.log('your answer is: ' + res);
});