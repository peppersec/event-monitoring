require('dotenv').config()
const cron = require('cron')
const Web3 = require('web3')
const Telegram = require('telegraf/telegram')
const web3 = new Web3(process.env.RPC_URL)
const telegram = new Telegram(process.env.TELEGRAM_BOT_TOKEN)

async function check() {
  try {
    const currentBlock = await web3.eth.getBlockNumber()
    const events = await web3.eth.getPastLogs({
      address: process.env.ADDRESS,
      topics: [web3.utils.soliditySha3(process.env.EVENT_SIGNATURE)],
      fromBlock: currentBlock - process.env.BLOCK_INTERVAL,
      toBlock: 'latest',
    })
    if (events.length === 0) {
      const message = process.env.ERROR_MESSAGE || `Did not find expected event ${process.env.EVENT_SIGNATURE}`
      await telegram.sendMessage(process.env.TELEGRAM_CHAT_ID, message, { parse_mode: 'HTML' })
    }
  } catch (e) {
    console.error(e)
    telegram.sendMessage(process.env.TELEGRAM_CHAT_ID, `Monitoring error: ${e}`).catch(console.error)
  }
}

if (process.argv.includes('healthcheck')) {
  // health check verifies that Telegram server is reachable
  telegram.getMe().then(() => {
    process.exit(0)
  }).catch(e => {
    console.error('Telegram API is unavailable', e)
    process.exit(101)
  })
} else {
  cron.job(process.env.CRON_EXPRESSION, check, null, true, null, null, true)
}
