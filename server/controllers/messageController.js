const Message = require("../model/messageModel");

async function addMessage(req, res, next) {
  try {
    const { from, to, message } = req.body;
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) res.json({ message: "Message added successfully" });
  } catch (err) {
    next(err);
  }
}
async function getAllMessage(req, res, next) {
  try {
    const { from, to } = req.body;
    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addMessage,
  getAllMessage,
};
