const UPVOTE = 'upvote'
const DOWNVOTE = 'downvote'

class BotHandler {
  constructor ({log, bot, axios, CodeController}) {
    this.log = log
    this.bot = bot
    this.codeController = new CodeController({axios, log})
  }

  onMessage (msg) {
    this.log.i(JSON.stringify(msg))
  }

  async onQuery (msg) {
    const data = await this.codeController.getRandomCode()
    const options = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: '👍', callback_data: `${UPVOTE}|${data.id}` }],
          [{ text: '👎', callback_data: `${DOWNVOTE}|${data.id}` }]
        ]
      })
    }
    this.bot.sendMessage(msg.chat.id, `${data.title}: ${data.description}`, options)
  }

  async onCallbackQuery (msg) {
    this.log.i(msg)
    if (msg.id) { await this.bot.answerCallbackQuery(msg.id) }
    const params = msg.data.split('|')
    const action = params[0]
    const codeID = params[1]
    const userID = msg.from.id
    let data
    if (action === UPVOTE) {
      data = await this.codeController.upvote({codeID, userID})
    } else if (action === DOWNVOTE) {
      data = await this.codeController.downvote({codeID, userID})
    }
    const option = {
      message_id: msg.message.message_id,
      chat_id: msg.message.chat.id,
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: data.points > 0 ? `👍 ${data.points}` : `👍`, callback_data: `${UPVOTE}|${data.id}` }],
          [{ text: data.points < 0 ? `👎 ${data.points}` : '👎', callback_data: `${DOWNVOTE}|${data.id}` }]
        ]
      })
    }
    this.bot.editMessageText(`${action} ${data.title}: ${data.description}`, option)
  }
}

module.exports = BotHandler
