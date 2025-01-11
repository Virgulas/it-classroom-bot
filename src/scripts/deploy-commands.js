const { REST, Routes } = require('discord.js');
const { client, DS_TOKEN, GUILD_ID, CLIENT_ID } = require('../settings');

const commands = [];

for (const [_, command] of client.commands) {
	commands.push(command.data.toJSON())
};

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(DS_TOKEN);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();