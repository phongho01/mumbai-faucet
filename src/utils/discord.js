require('dotenv').config();

const { EmbedBuilder } = require('discord.js');
const { COMMANDS } = require('../constants');

const getHelpEmbedded = () => {
  const helpEmbedded = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle('Command List')
    .setDescription('List available commands in this channel')

  COMMANDS.map((command) => {
    const fields = { name: `/${command.name}`, value: command.description };
    if (command.options) {
      command.options.map((options) => {
        fields.name += ` [${options.name}]`;
      });
    }
    helpEmbedded.addFields(fields);
  });

  return helpEmbedded;
};

module.exports = { getHelpEmbedded };
