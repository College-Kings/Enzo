const Discord = require("discord.js")

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })

const loadCommands = require("./commands/load-commands");
const botConfig = require("./bot_configs/config.json");
const music = require("./musicFunctions")

let servers = {};

client.on("ready", async () => {
    console.log(`Zayden is Running, version: ${botConfig.version}`);

    client.user.setPresence({
        activity: {
            name: "College Kings",
            type: 0,
        },
    })

    const guilds = client.guilds.cache.map(guild => guild.id)
    for (guild of guilds) {
        servers[guild].queue = new music.Queue(guild)
    }
    module.exports = { servers: servers }

    loadCommands(client)

});

client.on("disconnect", () => {
    console.log("Bot shutting down.")
})

client.on("error", error => {
    console.log(`Error Encountered`);
})

client.login(botConfig.token)