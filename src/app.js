const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const axios = require('axios')
const TelegramBot = require('node-telegram-bot-api')

const log = require('log-to-file-and-console-node')
const BotHandler = require('./botHandler')
const Routes = require('./route/routes')
const C = require('./constants')

const CodeController = require('./controller/code')

axios.defaults.baseURL = C.CONFIG.BASE_URL

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
const botHandler = new BotHandler({log, bot, axios, CodeController})
bot.onText(/\/code/, msg => botHandler.onQuery(msg))
bot.onText(/\/day/, msg => botHandler.onQuery(msg))
bot.onText(/\/app/, msg => botHandler.onQuery(msg))
bot.on('callback_query', msg => botHandler.onCallbackQuery(msg))
bot.on('message', msg => botHandler.onMessage(msg))
bot.on('polling_error', error => log.e(error))

/**
 * Routing
 */
const routes = new Routes(app, bot)
routes.configRoutes(bot)

module.exports = app
