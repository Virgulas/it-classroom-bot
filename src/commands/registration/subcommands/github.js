const { sendOrgInvitation } = require('../../../APIs/github/functions');
const { createUser, getUser } = require('../../../models/user');
const { organizationName } = require('../../../config.json');

class Github {
    static name = 'github';
    static description = 'register your profile with Github';
    static stringOptionName = 'user';
    static stringOptionDesc = "your github's username";

    static buildCommand(SlashCommandBuilder) {
        SlashCommandBuilder.setName(this.name);
        SlashCommandBuilder.setDescription(this.description)
        SlashCommandBuilder.addStringOption((option) => 
            option
                .setName(this.stringOptionName)
                .setDescription(this.stringOptionDesc)
                .setRequired(true)
            );
        return SlashCommandBuilder;
    }

    static async execute(interaction) {
        const response = await this.register(interaction);

        if (response === true) {
            interaction.reply("An invitation was sent to your Github account. \n\n Step by step on how to join: \n\n 1. Click your profile icon on Github. \n\n 2. Go to 'your organizations' page. \n\n 3. Click 'join' on the organization invite listed. \n\n 4. Click 'Accept Invitation' to accept the invitation. \n\n That's it. You're now registered. For the next step, run the command 'register verify'.")
        }
        else {
            interaction.reply("Your invitation was not sent: Reason - " + response)
        }
    }

    static async register(interaction) {
        const gitUser = interaction.options.getString(this.stringOptionName);
        const response = await sendOrgInvitation(organizationName, gitUser);
        const userId = interaction.member.id;

        if (response === true) {
            const userExists = await getUser(userId);
            
            if (!userExists) {
                await createUser(userId, gitUser);
            }
        }

        return response;
    }
}

module.exports = Github;