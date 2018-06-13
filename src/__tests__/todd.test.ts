import * as todd from '../todd';
import * as mockReadline from 'readline';

describe('riddler', () => {
  describe('riddler#ask()', () => {
    let messages = [];
    let triggerCallback;
    let receivedFooter;
    let calledTrigger;

    function ask(footer?: string): void {
      todd.ask({
        question: 'Welcome to Alien Artifacts! What would you like to do?',
        options: [
          {
            index: 1,
            text: 'start new game',
            cb: () => {
              calledTrigger = 'start new game'
            }
          },
          {
            index: 2,
            text: 'quit',
            cb: () => {
              calledTrigger = 'quit'
            },
          }
        ],
        footer
      });
    }
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
    });

    it('should log the question first', () => {
      ask();
      expect(messages[0]).toBe('Welcome to Alien Artifacts! What would you like to do?');
    });

    it('should log the options in the correct sequence', () => {
      ask();
      expect(messages[1]).toBe('1) start new game');
      expect(messages[2]).toBe('2) quit');
    }); 

    it('should prompt the default footer if no footer is provided', () => {
      ask();
      expect(receivedFooter).toBe('Choose one of the options and hit Enter\n');
    });

    it('should prompt the custom footer if one is provided', () => {
      ask('this is a custom footer');
      expect(receivedFooter).toBe('this is a custom footer');
    });

    it('should trigger the first callback', () => {
      ask();
      triggerCallback("1");
      expect(calledTrigger).toBe('start new game');
    });

    it('should trigger the second callback', () => {
      ask();
      triggerCallback("2");
      expect(calledTrigger).toBe('quit');
    });

    it('should say it doesn\'t understand the question and prompt again', () => {
      ask();
      triggerCallback("3");
      expect(messages[3]).toBe('I didn\'t quite get that.\n');
      expect(messages[4]).toBe('Welcome to Alien Artifacts! What would you like to do?');
      expect(messages[5]).toBe('1) start new game');
      expect(messages[6]).toBe('2) quit');
    });
  });

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
