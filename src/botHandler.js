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
      parse_mode: 'markdown',
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: '0 👍', callback_data: `${UPVOTE}|${data.id}` }],
          [{ text: '0 👎', callback_data: `${DOWNVOTE}|${data.id}` }],
          [{ text: 'share', url: `${process.env.BRANCH_DETAIL}${data.id}` }]
        ]
      })
    }
    this.bot.sendMessage(msg.chat.id, `*${data.title}*\n${data.description}`, options)
  }

  async onCallbackQuery (msg) {
    this.log.i(msg)
    if (msg.id) { await this.bot.answerCallbackQuery(msg.id) }
    const params = msg.data.split('|')
    const action = params[0]
    const codeID = params[1]
    const userID = msg.from.id
    const messageID = msg.message.message_id

    let data
    if (action === UPVOTE) {
      data = await this.codeController.upvote({codeID, userID, messageID})
    } else if (action === DOWNVOTE) {
      data = await this.codeController.downvote({codeID, userID, messageID})
    }

    const option = {
      message_id: msg.message.message_id,
      chat_id: msg.message.chat.id,
      parse_mode: 'markdown',
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: `${data.upvotes} 👍`, callback_data: `${UPVOTE}|${data.id}` }],
          [{ text: `${data.downvotes} 👎`, callback_data: `${DOWNVOTE}|${data.id}` }],
          [{ text: 'share', url: `${process.env.BRANCH_DETAIL}${data.id}` }]
        ]
      })
    }
    this.bot.editMessageText(`*${data.title}*\n${data.description}`, option)
  }
}

module.exports = BotHandler
