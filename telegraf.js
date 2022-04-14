const { Telegraf } = require('telegraf');
const db = require('./db');
const utils = require('./utils');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => {
  console.log(`[${new Date().toISOString()}]: New chat id ${ctx.chat.id}`);
  ctx.reply(
    'Welcome to telegram bot super promax \n👍👍👍👍 Quang Nguyễn mãi chất 👍👍👍👍\nCreating your channel..........'
  );
  const channelId = utils.makeid(20);
  ctx.reply(
    `Your channel id is: ${channelId} \nYour webhook url: ${process.env.ROOT_URL}/gitlab_hooks?channelId=${channelId}`
  );
  db.get('gitlab_channels').push({ channelId, chatId: ctx.chat.id }).write();
});
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

const sendMessage = (channelId, message) => {
  const channelInstance = db.get('gitlab_channels').find({ channelId }).value();
  bot.telegram.sendMessage(channelInstance.chatId, message);
};

const telegrafService = {
  sendMessage
};

module.exports = telegrafService;
