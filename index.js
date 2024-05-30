// Dependencies
import { Client, Intents } from "discord.js";
import { config } from "dotenv"; config(); // Load dotenv for managing environment variables from a .env file

// Discord client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const commandCallbacks = {
    ping: interaction => {
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "Pong!"
                }
            }
        }).catch(console.error); // for better error handling
    }
};

// Event Listener for Interactions
client.ws.on("INTERACTION_CREATE", async interaction => {
    const { name, options } = interaction.data;
    const callback = commandCallbacks[name];

    if (callback)callback(interaction);
});

// Error Handling for Client Login, and login to Discord
client.on("error", console.error);
client.login(process.env.TOKEN);
