const telegrafService = require('./telegraf');

const checkIcon = '✅'
const rejectIcon = '🆘'
const markIcon = '🎉'
const lineIcon = '👉'
const linkIcon = '🙏';

const handleMergeRequest = (channelId, data) => {
  console.log(data);
  if (data.object_attributes.action === 'open') {
    telegrafService.sendMessage(
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
    telegrafService.sendMessage(
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
    telegrafService.sendMessage(
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
    telegrafService.sendMessage(
      channelId,
      `
        \n${linkIcon} Đang deploy!!
        \n${lineIcon} Project: ${data.project.name}
        \n${linkIcon} ${data.project.web_url}
        `
    );
  }

  if (data.object_attributes.status === 'error') {
    telegrafService.sendMessage(
      channelId,
      `
        \n${rejectIcon} Deploy lỗi cmnr! Ảo ma canada need check gấp!!!!
        \n${lineIcon} Project: ${data.project.name}
        \n${linkIcon} ${data.project.web_url}
        `
    );
  }

  if (data.object_attributes.status === 'success') {
    telegrafService.sendMessage(
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
