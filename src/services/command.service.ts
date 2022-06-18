import fs from "fs";
import { Collection } from "discord.js";
import { ICommand } from "@/interfaces";
import path from "path";

class CommandService {
    private readonly commands = new Collection<String, ICommand>();

    public readCommandFolder(): void {
        const commandsPath = path.join(__dirname, "../commands");
        const commandFiles = fs.readdirSync(commandsPath);

        for (const file of commandFiles) {
            const command = require(`@/commands/${file}`);
            this.commands.set(command.data.name, command);
        }
    }

    public getCommands(): Collection<String, ICommand> {
        return this.commands;
    }
}

export default CommandService;
