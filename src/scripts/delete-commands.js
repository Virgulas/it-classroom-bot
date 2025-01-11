require('dotenv').config();
const { REST, Routes } = require('discord.js');
const { DS_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const rest = new REST().setToken(DS_TOKEN);

// ...

// for guild-based commands
rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);