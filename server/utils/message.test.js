const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from = 'KK';
    let text = 'Blowin.'
    let message = generateMessage(from, text);
    /*expect(message.from).toBe(from);
    expect(message.text).toBe(text);*/
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from, text});
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let from = 'Admin';
    let latitude = 1;
    let longitude = 1;
    let url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    let message = generateLocationMessage(from, latitude, longitude);
    expect(message.url).toBe(url);
    expect(message).toMatchObject({from, url});
  });
});
