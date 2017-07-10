var expect = require('expect');
var {generateMessage} = require('./message');


describe('generate message', () => {
    it('should generate the correct message object', () => {
        var from = 'Harshit';
        var text = 'Hello World';
        var message = generateMessage(from,text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});