const gitlabService = require("./gitlab.service");

const handleRequest = async (req, res) => {
    const { channelId } = req.query;
    const { object_kind } = req.body;
    if (object_kind === 'merge_request') {
        await gitlabService.handleMergeRequest(channelId, req.body);
    }

    if (object_kind === 'pipeline') {
        await gitlabService.handlePipeLineEvent(channelId, req.body);
    }
    res.send('Ok');
};

module.exports = { handleRequest }