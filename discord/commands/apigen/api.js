const db = require("quick.db");
const Discord = require('discord.js');
const { red, yellowBright } = require('chalk');
const fs = require("fs");

module.exports = {
    name: "apigen",
    description: "info for your anime",

    async run(client, message, args) {
        var desc;
        desc = args.slice(0).join('');
    if (desc) {

            function GlobalBlacklist(desc) {
                const Array1 = require('../../../api/apilist.json');

                const InArray = Array1.includes(desc);

                if (InArray === true) {
                    return message.reply('API PROVIDED ALREADY REGISTRED.').then((msg) => msg.delete({ timeout: 4000 })) && console.log(red('ERROR: API PROVIDED ALREADY REGISTRED'));
                } else {
                    Array1.push(desc)

                    console.log(yellowBright('Added an Api Successful\nData Saved ✅'))
                    const content = JSON.stringify(Array1, null, 2)
                    fs.writeFileSync(`api/apilist.json`, content, 'utf8')
                    const Successful = new Discord.MessageEmbed()
                        .setDescription(`Successfully Added Api \`${desc}\`. Updating Database!`)
                        .setColor(0x36393E)
                    message.author.send(Successful).then((msg) => msg.react('✅'))
                    db.set(`_desc${message.author.id}`, desc);

                }
            }
            GlobalBlacklist(desc);
    } else {
        const noID = new Discord.MessageEmbed()
            .setDescription('Error: Api not provided')
            .setColor(0x36393E)
        return message.channel.send(noID) && console.log(red('Api not provided'))
    }
    }
}