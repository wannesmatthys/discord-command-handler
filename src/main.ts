import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import dotenv from "dotenv";
import CommandService from "@/services/command.service";
import { startClient } from "@/handlers/client.handler";
import { ICommand } from "@/interfaces";

dotenv.config();

async function bootstrap() {
    const commandService = new CommandService();
    commandService.readCommandFolder();

    const commands = commandService.getCommands();
    startClient(commands);

    try {
        console.log("Started refreshing application (/) commands.");

        const rest = new REST({ version: "9" }).setToken(
            process.env.DISCORD_TOKEN
        );
        
        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            {
                body: Array.from(commands.values()).map((c: ICommand) =>
                    c.data.toJSON()
                ),
            }
        );

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
}

bootstrap();
