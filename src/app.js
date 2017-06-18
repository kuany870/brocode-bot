const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const TelegramBot = require('node-telegram-bot-api')

const log = require('log-to-file-and-console-node')
const BotHandler = require('./botHandler')
const Routes = require('./route/routes')

/**
 * HTTP Server
 */
const app = express()
app.use(bodyParser.json())
app.use(morgan('combined', {'stream': log.stream}))

/**
 * Bot
 */
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {polling: true})
const botHandler = new BotHandler(bot)
bot.on('message', msg => botHandler.onMessage(msg))
bot.on('polling_error', error => log.e(`polling_error: ${JSON.stringify(error)}`))

/**
 * Routing
 */
const routes = new Routes(app, bot)
routes.configRoutes(bot)

module.exports = app
