const {expect} = require('chai')
const {EventEmitter} = require('events')
const BotHandler = require('../src/botHandler')

const stubBot = new EventEmitter()
const botHandler = new BotHandler(stubBot)

describe('Test Bot Handler', () => {
  it('should pass', () => {
    botHandler.onMessage({})
    expect(true).to.equal(true)
  })
})
