const { Telegraf } = require('telegraf');
const db = require('./db');
const utils = require('./utils');

// eslint-disable-next-line no-undef
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => {
  console.log(`[${new Date().toISOString()}]: New chat id ${ctx.chat.id}`);
  ctx.reply(
    'Welcome to telegram bot super promax \nππππ Made by QuangNV ππππ\nCreating your channel..........'
  ).then(() => {
    const channelId = utils.makeid(20);
    ctx.reply(
      // eslint-disable-next-line no-undef
      `Your channel id is: ${channelId} \nYour webhook url: http://${process.env.ROOT_URL}:${process.env.PORT || 3003}?channelId=${channelId}`
    );
    ctx.reply(`<a href="https://github.com/quangnv13/telegram-gitlab-bot">Give me a star or issues =))</a>`, { parse_mode: 'HTML' })
    db.get('gitlab_channels').push({ channelId, chatId: ctx.chat.id }).write();
  });
});
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('π'));
bot.launch();

const sendMessage = (channelId, message) => {
  const channelInstance = db.get('gitlab_channels').find({ channelId }).value();
  bot.telegram.sendMessage(channelInstance.chatId, message, { parse_mode: 'HTML' });
};

const makeALink = (url) => {
  return `${linkIcon} <a href="${url}">Click to view</a>`
}



const checkIcon = 'β'
const rejectIcon = 'π'
const markIcon = 'π'
const lineIcon = 'π'
const linkIcon = 'π';

const handleMergeRequest = (channelId, data) => {
  if (data.object_attributes.action === 'open') {
    sendMessage(
      channelId,
      `
      \n${markIcon} RΓ’n chΖ‘i "${data.user.name}"" ΔΓ£ tαΊ‘o 1 merge request mα»i
      \n${markIcon} Title: ${data.object_attributes.title}
      \n${lineIcon} Project: ${data.project.name}
      \n${linkIcon} ${makeALink(data.object_attributes.url)}
      `
    );
  }

  if (data.object_attributes.action === 'merge') {
    sendMessage(
      channelId,
      `
      \n${checkIcon} Bro "${data.user.name}" ΔΓ£ approved merge request
      \n${markIcon} Title: ${data.object_attributes.title}
      \n${lineIcon} Project: ${data.project.name}
      \n${linkIcon} ${makeALink(data.object_attributes.url)}
      `
    );
  }

  if (data.object_attributes.action === 'close') {
    sendMessage(
      channelId,
      `
      \n${rejectIcon} Bro "${data.user.name}" ΔΓ£ close merge request
      \n${markIcon} Title: ${data.object_attributes.title}
      \n${lineIcon} Project: ${data.project.name}
      \n${linkIcon} ${makeALink(data.object_attributes.url)}
      `
    );
  }
}

const handlePipeLineEvent = (channelId, data) => {
  if (data.object_attributes.status === 'running') {
    sendMessage(
      channelId,
      `
        \n${linkIcon} Δang deploy!!
        \n${lineIcon} Project: ${data.project.name}
        \n${linkIcon} ${makeALink(data.project.web_url)}
        `
    );
  }

  if (data.object_attributes.status === 'error') {
    sendMessage(
      channelId,
      `
        \n${rejectIcon} Deploy lα»i cmnr! αΊ’o ma canada need check gαΊ₯p!!!!
        \n${lineIcon} Project: ${data.project.name}
        \n${linkIcon} ${makeALink(data.project.web_url)}
        `
    );
  }

  if (data.object_attributes.status === 'success') {
    sendMessage(
      channelId,
      `
        \n${checkIcon} ΔΓ£ deploy!!
        \n${lineIcon} Project: ${data.project.name}
        \n${linkIcon} ${makeALink(data.project.web_url)}
        `
    );
  }
}

const gitlabService = {
  handleMergeRequest,
  handlePipeLineEvent
};

module.exports = gitlabService;
