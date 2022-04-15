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



const checkIcon = '✅'
const rejectIcon = '🆘'
const markIcon = '🎉'
const lineIcon = '👉'
const linkIcon = '🙏';

const handleMergeRequest = (channelId, data) => {
  console.log(data);
  if (data.object_attributes.action === 'open') {
    sendMessage(
      channelId,
      `
      \n${markIcon} Rân chơi "${data.user.name}"" đã tạo 1 merge request mới
      \n${markIcon} Title: ${data.object_attributes.title}
      \n${lineIcon} Project: ${data.project.name}
      \n${linkIcon} Link: ${data.object_attributes.url}
      `
    );
  }

  if (data.object_attributes.action === 'merge') {
    sendMessage(
      channelId,
      `
      \n${checkIcon} Bro "${data.user.name}" đã approved merge request
      \n${markIcon} Title: ${data.object_attributes.title}
      \n${lineIcon} Project: ${data.project.name}
      \n${linkIcon} Link: ${data.object_attributes.url}
      `
    );
  }

  if (data.object_attributes.action === 'close') {
    sendMessage(
      channelId,
      `
      \n${rejectIcon} Bro "${data.user.name}" đã close merge request
      \n${markIcon} Title: ${data.object_attributes.title}
      \n${lineIcon} Project: ${data.project.name}
      \n${linkIcon} Link: ${data.object_attributes.url}
      `
    );
  }
}

const handlePipeLineEvent = (channelId, data) => {
  console.log(data);

  if (data.object_attributes.status === 'running') {
    sendMessage(
      channelId,
      `
        \n${linkIcon} Đang deploy!!
        \n${lineIcon} Project: ${data.project.name}
        \n${linkIcon} ${data.project.web_url}
        `
    );
  }

  if (data.object_attributes.status === 'error') {
    sendMessage(
      channelId,
      `
        \n${rejectIcon} Deploy lỗi cmnr! Ảo ma canada need check gấp!!!!
        \n${lineIcon} Project: ${data.project.name}
        \n${linkIcon} ${data.project.web_url}
        `
    );
  }

  if (data.object_attributes.status === 'success') {
    sendMessage(
      channelId,
      `
        \n${checkIcon} Đã deploy!!
        \n${lineIcon} Project: ${data.project.name}
        \n${linkIcon} ${data.project.web_url}
        `
    );
  }
}

const gitlabService = {
  handleMergeRequest,
  handlePipeLineEvent
};

module.exports = gitlabService;
