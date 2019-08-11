const Discord = require('discord.js');

module.exports = {
  usage: '[@user]',
  description: 'See someone\'s avatar.',
  allowDM: true,
  process: (bot, message) => {
    if (!message.mentions.users.first() ||
        message.mentions.users.first() === message.author) {
      if (message.author.avatarURL) {
        //Removes size parameter which breaks animated avatars hosting
        //Keep it in static avatars for higher quality
        avatarURLParts = message.author.avatarURL.split('?');
        if (avatarURLParts[0].slice(-3) == 'gif') {
          avatarURL = avatarURLParts[0];
        } else {
          avatarURL = message.author.avatarURL;
        }

        message.channel.send(avatarURL);
      } else {
        message.reply('You don\'t have an avatar :sob:');
      }
      return;
    }

    const member = message.mentions.members.first();
    const user = member.user;
    if (user.avatarURL) {
      if (member.roles.findKey('name', 'Private Avatar')) {
        message.reply('That user has made their avatar private <:naughty:334288355124576256>');
        return;
      }
      //Removes size parameter which breaks animated avatars hosting
      //Keep it in static avatars for higher quality
      avatarURLParts = user.avatarURL.split('?');
      if (avatarURLParts[0].slice(-3) == 'gif') {
        avatarURL = avatarURLParts[0];
      } else {
        avatarURL = user.avatarURL;
      }

      message.channel.send(
        'Here\'s ' + user + '\'s avatar, requested by ' +
        message.author + ': ' +
        avatarURL
      );
    } else {
      message.channel.send('Sorry ' + message.author + ', ' + user + ' doesn\'t have an avatar :sob:');
    }
  }
};
