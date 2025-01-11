async function memberVerify(org, user) {
    try {
        const { fetchOrganizationMembers } = await import('./API_methods.mjs');
        const members = await fetchOrganizationMembers(org);
        let isVerified = false;

        members.forEach(member => {
            if (member.login.toLowerCase() === String(user).toLowerCase()) {
                console.log(user + " is a member!");
                isVerified = true;
            }
        })

        if (!isVerified) {
            console.log(`The user "${user}" wasn't found in ${org}!`);
        }

        return isVerified;

    } catch (error) {
        console.log('Member could not be verified: ' + error);
    }
}

async function memberHasFork(org, user, repo) {
    try {
        const { fetchRepositoryForks } = await import('./API_methods.mjs');
        const forksData =  await fetchRepositoryForks(org, repo);
        let hasFork = false;

        forksData.forEach(fork => {
            if (fork.owner.login.toLocaleLowerCase() === String(user).toLocaleLowerCase()) {
                console.log(user + " has a fork!");
                hasFork = true;
            }
        })

        if (!hasFork) {
            console.log(`User ${user} was not found in forks data.`)
        }

        return hasFork;
    } catch (error) {
        console.log("Something went wrong and the fork fetch has failed: " + error);
    }
}

async function sendOrgInvitation(org, user) {
    try {
        const { inviteUserToOrgByUsername } = await import('./API_methods.mjs');

        if (await memberVerify(org, user)) {
            throw new Error("The requested user is already a member.");
        }

        const invitation = await inviteUserToOrgByUsername(org, user);

        if (invitation) {
            return true;
        }
        else {
            throw new Error("User invitation couldn't proceed. Verify if you typed your username correctly.");
        }

    } catch (error) {
        console.log("Invitation error: " + error);
        return error.toString();
    }
}

module.exports = {
    memberVerify,
    memberHasFork,
    sendOrgInvitation
}
