const { SlashCommandBuilder } = require('discord.js');
const Ping  = require('./subcommands/ping');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('utility')
		.setDescription('utility commands')
        .addSubcommand((SlashCommandBuilder) => Ping.buildCommand(SlashCommandBuilder)),
        async execute(interaction) {
            const resolvedInteraction = await interaction;
            const subcommand = resolvedInteraction.options.getSubcommand();

            switch(subcommand) {
                case Ping.name:
                    Ping.execute(resolvedInteraction);
                    break;
                default:
                    console.log('Interaction.name was not found.');
            }
        }
};