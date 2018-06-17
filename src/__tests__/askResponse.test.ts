import * as todd from '../todd';
import * as mockReadline from 'readline';

describe('todd', () => {
  describe('riddler#askResponse()', () => {
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
      todd.askResponse({
        question: 'What\'s your favourite colour?',
        callback: (err, res) => messages.push(res)
      });
    });
    afterEach(() => {
      messages = [];
    });

    it('should ask the question first', () => {
      expect(messages[0]).toBe('What\'s your favourite colour?');
    });

    it('should return the response when user response was received', () => {
      triggerCallback('my answer');
      expect(messages[1]).toBe('my answer');
    });
  });
});
