import { ask } from '../todd';
import * as mockReadline from 'readline';

describe('todd', () => {
  describe('triggerAsk with callback', () => {
    let messages = [];
    let triggerCallback;
    let receivedFooter;
    let calledTrigger;

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

    function triggerAsk(footer?: string): void {
      ask({
        question: 'Welcome to Alien Artifacts! What would you like to do?',
        options: [
          {
            index: 1,
            text: 'start new game',
            callback: () => {
              calledTrigger = 'start new game'
            }
          },
          {
            index: 2,
            text: 'quit',
            callback: () => {
              calledTrigger = 'quit'
            },
          }
        ],
        footer
      });
    }

    describe('general logic', () => {
      it('should log the question first', () => {
        triggerAsk();
        expect(messages[0]).toBe('Welcome to Alien Artifacts! What would you like to do?');
      });
  
      it('should log the options in the correct sequence', () => {
        triggerAsk();
        expect(messages[1]).toBe('1) start new game');
        expect(messages[2]).toBe('2) quit');
      }); 
  
      it('should prompt the default footer if no footer is provided', () => {
        triggerAsk();
        expect(receivedFooter).toBe('Choose one of the options and hit Enter\n');
      });
  
      it('should prompt the custom footer if one is provided', () => {
        triggerAsk('this is a custom footer');
        expect(receivedFooter).toBe('this is a custom footer');
      });
    });

    describe('callback logic', () => {
      it('should trigger the first callback', () => {
        triggerAsk();
        triggerCallback("1");
        expect(calledTrigger).toBe('start new game');
      });
  
      it('should trigger the second callback', () => {
        triggerAsk();
        triggerCallback("2");
        expect(calledTrigger).toBe('quit');
      });
  
      it('should say it doesn\'t understand the question and prompt again', () => {
        triggerAsk();
        triggerCallback("3");
        expect(messages[3]).toBe('I didn\'t quite get that.\n');
        expect(messages[4]).toBe('Welcome to Alien Artifacts! What would you like to do?');
        expect(messages[5]).toBe('1) start new game');
        expect(messages[6]).toBe('2) quit');
      });
    });
  });


  describe('triggerAsk with promise', () => {
    let messages = [];
    let triggerCallback;
    let receivedFooter;
    let calledTrigger;

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

    function triggerAsk(footer?: string): Promise<string>  | void {
      return ask({
        question: 'Welcome to Alien Artifacts! What would you like to do?',
        options: [
          {
            index: 1,
            text: 'start new game'
          },
          {
            index: 2,
            text: 'quit',
          }
        ],
        footer
      });
    }

    describe('general logic', () => {
      it('should log the question first', () => {
        triggerAsk();
        expect(messages[0]).toBe('Welcome to Alien Artifacts! What would you like to do?');
      });
  
      it('should log the options in the correct sequence', () => {
        triggerAsk();
        expect(messages[1]).toBe('1) start new game');
        expect(messages[2]).toBe('2) quit');
      }); 
  
      it('should prompt the default footer if no footer is provided', () => {
        triggerAsk();
        expect(receivedFooter).toBe('Choose one of the options and hit Enter\n');
      });
  
      it('should prompt the custom footer if one is provided', () => {
        triggerAsk('this is a custom footer');
        expect(receivedFooter).toBe('this is a custom footer');
      });
    });

    describe('promise logic', () => {
      it('should return the first option in the promise resolve', (done) => {
        const question = <Promise<string>> triggerAsk();
        question
          .then(res => {
            expect(res).toBe('1')
            done();
          });
        triggerCallback('1');
      });
  
      it('should return the second option in the promise resolve', (done) => {
        const question = <Promise<string>> triggerAsk();
        question
          .then(res => {
            expect(res).toBe('2')
            done();
          });
        triggerCallback('2');
      });
  
      it('should say it doesn\'t understand the question and prompt again', (done) => {
        const question = <Promise<string>> triggerAsk();
        question.then(() => {
            expect(messages[3]).toBe('I didn\'t quite get that.\n');
            expect(messages[4]).toBe('Welcome to Alien Artifacts! What would you like to do?');
            expect(messages[5]).toBe('1) start new game');
            expect(messages[6]).toBe('2) quit');
            expect(receivedFooter).toBe('Choose one of the options and hit Enter\n');
            done();
          });
        triggerCallback("3");
        triggerCallback("2");
      });

    });
  });
});
