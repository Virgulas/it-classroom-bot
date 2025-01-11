# IT Classroom Bot

IT Classroom Bot is a Discord bot designed to streamline the onboarding process for new members in your IT Classroom Discord server. It facilitates GitHub integration and role assignment through interactive slash commands.

## Features

### 1. **Prompt for GitHub Username**

- **Command:** `/github`
- **Functionality:** Prompts the user to provide their GitHub username when they join the server.
- **Outcome:** Sends an invitation to join the GitHub organization associated with your server.

### 2. **Verify GitHub Organization Membership**

- **Command:** `/verify`
- **Functionality:** Checks if the user has accepted the GitHub organization invitation.
- **Outcome:** Assigns the user a `Git Verified` role upon successful verification.

### 3. **Task Assignment: Fork Verification Repository**

- **Command:** `/fork`
- **Functionality:** A task is sent to the user, asking them to fork the verification repository: [IT-Classroom-verify](https://github.com/DS-IT-Classroom/IT-Classroom-verify). This command verifies if the repository was forked.
- **Outcome:** Ensures users are familiar with GitHub forking and collaboration processes.

## Getting Started

### Prerequisites

- A Discord server with appropriate permissions to manage roles and use slash commands.
- A GitHub organization for your server.
- A verification repository ([IT-Classroom-verify](https://github.com/DS-IT-Classroom/IT-Classroom-verify)) hosted within your GitHub organization.

### Installation

1. Clone the bot repository to your local machine:
   ```bash
   git clone <repository-url>
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Set up a `.env` file with the following variables:
   ```env
   DS_TOKEN=your_discord_bot_token
   GUILD_ID=your_server_id
   CLIENT_ID=your_client_id
   GITHUB_AUTH=your_github_auth
   ```
4. Set up the `config.json` file within src with the following variables:
   ```env
   "organizationName": your_organization_name,
   "forkTest": your_organization_test_repo_name,
   "verifiedRole": role_id_for_git_verified_cmd,
   "forkVerified": role_id_for_fork_verified_cmd
   ```
4. Run the bot:
   ```bash
   cd <project_folder>
   cd <src>
   node app.js
   ```

### Usage

- Use `/github` to initiate the onboarding process.
- Monitor the user's progress through the `/verify` and `/fork` commands.

## Roles

- **Git Verified:** Granted upon confirming the user has joined the GitHub organization.
- **Repository Verified:** Granted upon confirming the user has forked the verification repository.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the [MIT License].

---

With IT Classroom Bot, you can ensure a smooth onboarding experience for your Discord server members, integrating GitHub tasks into the process seamlessly.

