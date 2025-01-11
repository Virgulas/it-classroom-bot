class Ping {
    static name = 'ping';
    static description = 'Replies with pong!';

    static buildCommand(SlashCommandBuilder) {
        SlashCommandBuilder.setName(this.name);
        SlashCommandBuilder.setDescription(this.description);
        return SlashCommandBuilder;
    }

    static execute(interaction) {
        interaction.reply('Pong!');
    }
}

module.exports = Ping;