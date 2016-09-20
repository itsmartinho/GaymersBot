const moment = require('moment');
const format = require('../momentFormat');

module.exports = {
  // Logs a message edit in #user-logs.
  process: (bot, oldMessage, newMessage) => {
    // Don't tag bot message updates
    if (oldMessage.author === bot || newMessage.author === bot) return;

    let userLogs = bot.channels.find('name', 'user-logs');

    userLogs.sendMessage(
      '**' + newMessage.author.username +
      '**#' + newMessage.author.discriminator +
      ' edited a message. ' +
      '(' + moment(Date.now()).format(format) + ') ' +
      '```' +
      oldMessage.content +
      '```' +
      // 'to' +
      '```' +
      newMessage.content +
      '```'
    );
  }
};