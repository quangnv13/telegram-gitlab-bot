const telegrafService = require('./telegraf');

const handleMergeRequest = (req, res) => {
  const { channelId } = req.query;
  const { event_type, user, repository, object_attributes, last_commit, assignee } = req.body;
  if (event_type === 'merge_request') {
    if (object_attributes.action === 'open') {
      telegrafService.sendMessage(
        channelId,
        `
      *=*=*=*=*=*=*=*=*=*=*=*=*
      \nRân chơi ${user.name} đã tạo 1 merge request mới
      \n============= REPO: ${repository.name} =============
      \n============= ${object_attributes.source_branch} => ${object_attributes.target_branch}
      \n============= Last commit: ${object_attributes.last_commit.message} =============
      \n*=*=*=*=*=*=*=*=*=*=*=*=*`
      );
    }

    if (object_attributes.action === 'merge') {
      telegrafService.sendMessage(
        channelId,
        `
      *=*=*=*=*=*=*=*=*=*=*=*=*
      \nBro ${user.name} đã merged merge request
      \n============= REPO: ${repository.name} =============
      \n============= ${object_attributes.source_branch} => ${object_attributes.target_branch}
      \n============= Last commit: ${object_attributes.last_commit.message} =============
      \n*=*=*=*=*=*=*=*=*=*=*=*=*`
      );
    }
  }
  res.send('Ok');
};

const handlePipeline = (req, res) => {
  res.send('Ok');
};

const gitlabService = {
  handleMergeRequest,
  handlePipeline
};

module.exports = gitlabService;
