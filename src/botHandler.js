const log = require('log-to-file-and-console-node')

class BotHandler {
  constructor (bot) {
    this.bot = bot
  }

  onMessage (msg) {
    log.i(JSON.stringify(msg), process.env.DISABLE_LOGGING)
  }
}

module.exports = BotHandler
