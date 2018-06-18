import { askResponse } from '../todd';
import * as mockReadline from 'readline';

describe('todd#askResponse', () => {
  describe('askResponse()', () => {
    let messages = [];
    let receivedFooter;
    let triggerCallback;
    beforeEach(() => {
      console.log = jest.fn(log => messages.push(log));
      mockReadline.createInterface = jest.fn(() => ({
        question: (givenFooter, callback) => {
          receivedFooter = givenFooter;
          triggerCallback = callback;
        },
        close: () => 'closing'
      }));
    });
    afterEach(() => {
      messages = [];
      jest.unmock('readline');
    });

    function askWithCallback() {
      askResponse({
        question: 'What\'s your favourite colour?',
        callback: (err, res) => messages.push(res)
      });
    }
    it('should ask the question first', () => {
      askWithCallback();
      expect(messages[0]).toBe('What\'s your favourite colour?');
    });

    it('should return the response when user response was received', () => {
      askWithCallback();
      triggerCallback('my answer');
      expect(messages[1]).toBe('my answer');
    });

    it('should return the response as the promise result when user response was received', (done) => {
      const question = <Promise<string>> askResponse({
        question: 'What\'s your favorite color?'
      });
      question.then(res => {
        expect(res).toBe('my answer');
        done();
      });
      triggerCallback('my answer');
    });

  });
});
