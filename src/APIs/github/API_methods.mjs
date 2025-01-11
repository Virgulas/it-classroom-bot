import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';

dotenv.config()

const githubToken = process.env.GITHUB_AUTH;

const octokit = new Octokit({
  auth: githubToken
});

async function fetchOrganizationMembers(org) {
  try {
    const response = await octokit.orgs.listMembers({
      org: org
    })

    const members = response.data;

    return members;
    
  } catch (error) {
    console.error(`Error fetching members: ${error.message}`);
  }
}

async function fetchRepositoryForks(owner, repo) {
  try {
    const response = await octokit.rest.repos.listForks({
      owner: owner, 
      repo: repo,
    });

    const forks = response.data;

    return forks;

  } catch (error) {
    console.error(`Error fetching forks: ${error.message}`);
  }
}

async function getUser(user) {
  try {
    const userData = await octokit.rest.users.getByUsername({ username: user });
  
    return userData;
    
  } catch (error) {
    console.error(`User was not found: ${error.message}`);
    return null;
  }
}

async function inviteUserToOrgByUsername(org, username) {
  try {
    const user = await getUser(username);
    
    if (!user) {
      throw new Error("Couldn't fetch user.")
    }
    
    const response = await octokit.rest.orgs.createInvitation({
      org: org, 
      invitee_id: user.data.id, 
      role: "direct_member" 
    });

    console.log(`Invitation sent to ${username} for organization ${org}`);
    console.log('Invitation details:', response.data);

    return true;
  } catch (error) {
    console.error(`Error sending invitation: ${error.message}`);

    return false;
  }
}

export {
  fetchOrganizationMembers,
  fetchRepositoryForks,
  inviteUserToOrgByUsername
}