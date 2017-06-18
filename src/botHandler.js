const log = require('log-to-file-and-console-node')

class BotHandler {
  constructor (bot) {
    this.bot = bot
  }

  onMessage (msg) {
    log.i(JSON.stringify(msg))
  }

  onQuery (msg) {
    const options = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'option a', callback_data: 'a' }],
          [{ text: 'option b', callback_data: 'b' }]
        ]
      })
    }
    this.bot.sendMessage(msg.chat.id, 'A question?', options)
  }

  onCallbackQuery (msg) {
    const option = {
      message_id: msg.message.message_id,
      chat_id: msg.message.chat.id
    }
    this.bot.answerCallbackQuery(msg.id).then(() => {
      if (msg.data === 'a') {
        this.bot.editMessageText('option a', option)
      } else if (msg.data === 'b') {
        this.bot.editMessageText('option b', option)
      }
    })
  }
}

module.exports = BotHandler
