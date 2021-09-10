const { prefix } = require('../settings.json');

module.exports = {
    name: "help",
    description: "info for your anime",

    async run(client, message, args) {
        const help = new Discord.MessageEmbed()
        .setTitle(`${client.user.username} | Help `)
        .setDescription(` Moderation.
\n **Banning:**
\n **Ban** | \`${prefix}ban [user]\` \n **Lockdown** | \`${prefix}lock \` \n **Unlock** | \`${prefix}unlock\`
\n **Kicking:**
\n **Kick** | \`${prefix}kick [user]\`
\n **Messages:**
\n **Purge** | \`${prefix}purge [Numb]\` *Max: 100 | 2 Weeks Old*
\n **Info:**
\n **Kick** | \`${prefix}userinfo [user]\`
\n **Api:**
\n **Kick** | \`${prefix}apigen [word]\`
            `)
        .setFooter(`© ${client.user.username} | Prefix: ${prefix} | By: Zer0Two`)
        .setColor(0x36393E)
        .setTimestamp(Date.now());
        message.channel.send(help)
    }
}