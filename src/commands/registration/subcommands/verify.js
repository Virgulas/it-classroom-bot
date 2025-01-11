const { memberVerify } = require('../../../APIs/github/functions');
const { getUser, updateUser } = require('../../../models/user');
const { organizationName, verifiedRole } = require('../../../config.json');

class Verify {
    static name = 'verify';
    static description = "verify if you're part of the organization";

    static buildCommand(SlashCommandBuilder) {
        SlashCommandBuilder.setName(this.name);
        SlashCommandBuilder.setDescription(this.description)

        return SlashCommandBuilder;
    }

    static async execute(interaction) {
        const response = await this.verify(interaction);

        interaction.reply(response);

    }

    static async verify(interaction) {
        const member = await interaction.member.fetch();
        const memberId = member.id;
        const userData = await getUser(memberId);

        if (userData && !userData.gitVerified) {
            const response = await memberVerify(organizationName, userData.gitAcc);

            if (response === true) {
                await updateUser(memberId, { ...userData.dataValues, gitVerified: true });
                member.roles.add(verifiedRole);
                
                return "You have been verified! Now you're a trusted member. \n\n Next, try forking your first repo from the organization and use the command 'fork' to get checked. \n\n 1. First, click your profile icon and go to 'your organizations'. \n\n 2. In my organizations, go to the It Classroom organization page. \n\n 3. Click the repositories page. \n\n 4. Search for the 'IT-Classroom-verify' repo and click it. \n\n 5. Click fork and fork it to your account. Now you're ready to run 'fork'.";
            }
            else {
                return "You need to accept the invitation first.";
            }
        }
        else if (userData.gitVerified) {
            return "You already have been checked.";
        }
        
        return "Your data wasn't found. Try registering your Github account first.";
    }
}

module.exports = Verify;