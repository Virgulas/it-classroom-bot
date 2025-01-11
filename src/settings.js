require('dotenv').config();

const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
const { loadCommands, loadEvents } = require('./helper');
const { DS_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ]
});

client.commands = new Collection();

loadCommands((command, filePath) => {
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
});



loadEvents(client);

module.exports = {
    DS_TOKEN,
    GUILD_ID,
    CLIENT_ID,
    Events,
    client,
};
