const { memberHasFork } = require('../../../APIs/github/functions');
const { getUser } = require('../../../models/user');
const { organizationName, forkVerified, forkTest } = require('../../../config.json');

class Fork {
    static name = 'fork';
    static description = "verify if you forked the first project";

    static buildCommand(SlashCommandBuilder) {
        SlashCommandBuilder.setName(this.name);
        SlashCommandBuilder.setDescription(this.description)

        return SlashCommandBuilder;
    }

    static async execute(interaction) {
        const response = await this.fork(interaction);

        interaction.reply(response);

    }

    static async fork(interaction) {
        const member = await interaction.member.fetch();
        const memberId = member.id;
        const userData = await getUser(memberId);

        if (userData) {
            if (userData.gitVerified) {
                const hasFork = await memberHasFork(organizationName, userData.gitAcc, forkTest);
                if (hasFork) {
                    member.roles.add(forkVerified);
                    return "You have passed the test! Now you're ready to start your projects.";
                }
                else {
                    return "You need to fork the test repository first. Try forking your first repo from the organization and use the command 'fork' to get checked. \n\n 1. First, click your profile icon and go to 'your organizations'. \n\n 2. In my organizations, go to the It Classroom organization page. \n\n 3. Click the repositories page. \n\n 4. Search for the 'IT-Classroom-verify' repo and click it. \n\n 5. Click fork and fork it to your account. Now you're ready to run 'fork'.";
                }
                
            }
            else {
                return "You need to verify your account it with the command 'verify'.";
            }
        }
        
        return "Your data wasn't found. Try registering your Github account or verify it first.";
    }
}

module.exports = Fork;