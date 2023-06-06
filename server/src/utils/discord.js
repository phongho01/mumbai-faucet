require('dotenv').config();

const { Routes, REST, Client, GatewayIntentBits, Events } = require('discord.js');
const { COMMANDS } = require('../constants');
const { faucet } = require('./ethers');

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;

const rest = new REST({ version: '10' }).setToken(TOKEN);

const bot = {
  start: async () => {
    try {
      await rest.put(Routes.applicationCommands(CLIENT_ID), { body: COMMANDS });
    } catch (error) {
      console.error(error);
    }
  },
  login: async (redis) => {
    const client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages],
      partials: ['CHANNEL'],
    });
    client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on(Events.MessageCreate, async (message) => {
      if (message.content.startsWith('!faucet')) {
        const author = message.author.id;
        const address = message.content.split(' ')[1] || '';
        const res = await faucet(author, address, redis);
        message.reply(res);
      }
    });

    client.on(Events.InteractionCreate, async (interaction) => {
      try {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === 'faucet') {
          const author = interaction.user.id;
          const address = interaction.options.getString('address');
          await interaction.deferReply();
          const res = await faucet(author, address, redis);
          await interaction.editReply(res);
        }
      } catch (error) {
        await interaction.reply('An error has been occur');
      }
    });

    client.login(TOKEN);
  },
};

module.exports = bot;
