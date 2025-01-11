const { SlashCommandBuilder } = require('discord.js');
const Github = require('./subcommands/github')
const Verify = require('./subcommands/verify');
const Fork = require('./subcommands/fork');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('commands to register')
        .addSubcommand((SlashCommandBuilder) => Github.buildCommand(SlashCommandBuilder))
        .addSubcommand((SlashCommandBuilder) => Verify.buildCommand(SlashCommandBuilder))
        .addSubcommand((SlashCommandBuilder) => Fork.buildCommand(SlashCommandBuilder)),
        async execute(interaction) {
            const resolvedInteraction = await interaction;
            const subcommand = resolvedInteraction.options.getSubcommand();

            switch(subcommand) {
                case Github.name:
                    Github.execute(resolvedInteraction);
                    break;
                case Verify.name:
                    Verify.execute(resolvedInteraction);
                    break;
                case Fork.name:
                    Fork.execute(resolvedInteraction);
                    break;
                default:
                    console.log('Interaction.name was not found.');
            }
        }
};