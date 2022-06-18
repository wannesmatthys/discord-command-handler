import { Collection } from "discord.js";
import { ICommand } from "@/interfaces";

declare module "discord.js" {
    export interface Client {
        commands?: Collection<String, ICommand>;
    }
}
