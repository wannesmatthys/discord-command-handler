import { Client, Interaction, Intents, Collection } from "discord.js";
import { ICommand } from "@/interfaces";

export const startClient = (commands: Collection<String, ICommand>) => {
    const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

    client.commands = commands;

    client.once("ready", (): void => {
        console.log("Ready!");
    });

    client.on(
        "interactionCreate",
        async (interaction: Interaction): Promise<void> => {
            if (!interaction.isCommand()) {
                return;
            }

            const command = client.commands?.get(interaction.commandName);

            if (!command) {
                return;
            }

            await command.execute(interaction);
        }
    );

    client.login(process.env.DISCORD_TOKEN);
};
