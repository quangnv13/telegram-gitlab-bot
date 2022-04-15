const { Telegraf } = require('telegraf');
const db = require('./db');
const utils = require('./utils');

// eslint-disable-next-line no-undef
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => {
  console.log(`[${new Date().toISOString()}]: New chat id ${ctx.chat.id}`);
  ctx.reply(
    'Welcome to telegram bot super promax \n👍👍👍👍 Made by QuangNV 👍👍👍👍\nCreating your channel..........'
  ).then(() => {
    const channelId = utils.makeid(20);
    ctx.reply(
      // eslint-disable-next-line no-undef
      `Your channel id is: ${channelId} \nYour webhook url: http://${process.env.ROOT_URL}:${process.env.PORT || 3003}?channelId=${channelId}`
    );
    db.get('gitlab_channels').push({ channelId, chatId: ctx.chat.id }).write();
  });
});
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.launch();

const sendMessage = (channelId, message) => {
  const channelInstance = db.get('gitlab_channels').find({ channelId }).value();
  bot.telegram.sendMessage(channelInstance.chatId, message);
};

const telegrafService = {
  sendMessage
};

module.exports = telegrafService;
