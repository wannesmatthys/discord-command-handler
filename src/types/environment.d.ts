declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly NODE_ENV: "dev" | "production";
            readonly DISCORD_TOKEN: string;
            readonly CLIENT_ID: string;
            readonly GUILD_ID: string;
        }
    }
}

export {};
