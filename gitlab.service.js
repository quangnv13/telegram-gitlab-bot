const telegrafService = require('./telegraf');

const handleRequest = (req, res) => {
  const { channelId } = req.query;
  const { object_kind, user, object_attributes, project } = req.body;
  if (object_kind === 'merge_request') {
    const { repository } = req.body;
    if (object_attributes.action === 'open') {
      telegrafService.sendMessage(
        channelId,
        `
      * - * - * - * - * - * - *
      \nRân chơi ${user.name} đã tạo 1 merge request mới
      \n===== REPO: ${repository.name} =====
      \n===== ${object_attributes.source_branch} => ${object_attributes.target_branch}
      \n===== Last commit: ${object_attributes.last_commit.message} =====
      \n===== Mời bro ${object_attributes.assignee.name} vô check ====
      \n* - * - * - * - * - * - *`
      );
    }

    if (object_attributes.action === 'merge') {
      telegrafService.sendMessage(
        channelId,
        `
      * - * - * - * - * - * - *
      \nBro ${user.name} đã approve merge request
      \n===== REPO: ${repository.name} =====
      \n===== ${object_attributes.source_branch} => ${object_attributes.target_branch}
      \n===== Last commit: ${object_attributes.last_commit.message} =====
      \n* - * - * - * - * - * - *`
      );
    }
  }

  if (object_kind === 'pipeline') {
    const { merge_request } = req.body;
    if (object_attributes.status === 'error') {
      telegrafService.sendMessage(
        channelId,
        `
      * - * - * - * - * - * - *
      \nBuild lỗi! Mau check lại...
      \n===== Merge request: ${merge_request.title} =====
      \n===== ${merge_request.source_branch} => ${merge_request.target_branch}
      \n* - * - * - * - * - * - *`
      );
    }

    if (object_attributes.status === 'success') {
      telegrafService.sendMessage(
        channelId,
        `
      * - * - * - * - * - * - *
      \n Đã build...
      \n===== REPO: ${project.name} =====
      \n===== Merge request: ${merge_request.title} =====
      \n===== ${merge_request.source_branch} => ${merge_request.target_branch}
      \n===== Created by: ${user.name} =====
      \n* - * - * - * - * - * - *`
      );
    }
  }
  res.send('Ok');
};

const gitlabService = {
  handleRequest
};

module.exports = gitlabService;
