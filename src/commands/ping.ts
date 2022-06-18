import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!");

const execute = async (interaction: CommandInteraction) => {
    await interaction.reply("Pong!");
};

export { data, execute };
