// API & Packages
const { MessageEmbed, Client, Collection, Intents, MessageActionRow, MessageButton } = require('discord.js');
const client = new Client({ disableMentions: "everyone" }, { ws: { intents: Intents.PRIVILEGED } });
const fs = require("fs")
const chalk = require('chalk')
const path = require("path");
const Discord = require("discord.js")
require('discord-buttons')(client)
const { token, prefix } = require('./commands/settings.json');

client.commands = new Collection();

let commandDir = "commands";

for (const category of fs.readdirSync(`./discord/${commandDir}`)) {
    if (!fs.statSync(`./discord/${commandDir}/${category}`).isDirectory()) continue;
    const direc2 = fs.readdirSync(path.join(`./discord/${commandDir}/${category}`)).filter(file => file.endsWith(".js"))
    for (const f of direc2) {
        const command = require(`./${commandDir}/${category}/${f}`);
        client.commands.set(command.name, command);
    }
    for (const folder of fs.readdirSync(`./discord/${commandDir}/${category}`)) {
        if (!fs.statSync(`./discord/${commandDir}/${category}/${folder}`).isDirectory()) continue;
        const direc = fs.readdirSync(path.join(`./discord/${commandDir}/${category}/${folder}`)).filter(file => file.endsWith(".js"))
        for (const f of direc) {
            const command = require(`./discord/${commandDir}/${category}/${folder}/${f}`);
            client.commands.set(command.name, command);
        }
        for (const files of fs.readdirSync(`./discord/${commandDir}/${category}/${folder}`)) {
            const command = require(`./discord/${commandDir}/${category}/${folder}/${files}`);

            client.commands.set(command.name, command);
        }
    }
}

// Listeners
process.setMaxListeners(300);
// Customizations
const { red, green, magenta, greenBright, magentaBright, yellowBright, blue, blueBright, grey, redBright, yellow, cyan, cyanBright } = require('chalk');

client.on("ready", () => {
    let ActiOptions = ["STREAMING", "PLAYING", "LISTENING", "WATCHING"];
    setInterval(function () {
        // Randomise
        let randomsieActivity = ActiOptions[Math.floor(Math.random() * ActiOptions.length)];
        // Activity
        client.user.setActivity({
            name: `ZeroApi Best Api`,
            type: randomsieActivity,
            url: "https://www.twitch.tv/zeroraidapi"
        });

    }, 10000);
});

// Commands
client.on("message", message => {

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    // Logs Command
    if (message.content.startsWith(prefix)) {

        const d = new Date();
        const date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();

        console.log(green(`[COMMAND RAN] : ${message.content} | ${message.author.tag} | [SERVER] : ${message.guild.name} | [TIME] : ${date}`))

        // Args
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if (!client.commands.has(command)) return console.log("Command doesnt exist")

        try {
            client.commands.get(command).run(client, message, args);
        } catch (error) {
            console.error(error);
        }
    }


})

client.login(token);
