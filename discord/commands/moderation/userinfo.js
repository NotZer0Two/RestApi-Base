const moment = require("moment");
const db = require("quick.db")
require('moment');
const Discord = require('discord.js')


module.exports = {
    name: "info",
    description: "trust command",

    async run(client, message, args) {

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        var api = db.get(`_desc${user.id}`);
        let durumm;
        let durum = user.presence.status

        let roles = user.roles.cache.map(x => x).filter(z => z.name !== "@everyone");

        if (roles.length > 100) {
            roles = "There is so much roles to show."
        }

        let safe = message.author.createdTimestamp

        if (safe > 604800017) {
            safe = "`Reliable` 🟢"
        } else {
            safe = "`Suspicious` 🔴"
        }


        if (durum === "online") durumm = `Online 🟢 `
        if (durum === "offline") durumm = `Offline ⚫ `
        if (durum === "idle") durumm = `Idle 🌙`
        if (durum === "dnd") durumm = `Do not disturb 🔴  `

        let lastMessage
        let lastMessageTime
        let nitroBadge = user.user.avatarURL({ dynamic: true })
        let flags = user.user.flags.toArray().join(``)

        if (!flags) {
            flags = "User doesn't have any badge"
        }

        flags = flags.replace("HOUSE_BRAVERY", "• 🏠🟣 \`HypeSquad Bravery\`")
        flags = flags.replace("EARLY_SUPPORTER", "• 🟣🔮 \`Early Supporter\`")
        flags = flags.replace("EARLY_VERIFIED_DEVELOPER", "• 🤖 \`Verified Bot Developer\`")
        flags = flags.replace("HOUSE_BRILLIANCE", "• 🏠🟠 \`HypeSquad Brilliance\`")
        flags = flags.replace("HOUSE_BALANCE", "• 🏠🟢 \`HypeSquad Balance\`")
        flags = flags.replace("DISCORD_PARTNER", "• 👯‍♀️ \`Partner\`")
        flags = flags.replace("HYPESQUAD_EVENTS", "• ⚜️ \`Hypesquad Event\`")
        flags = flags.replace("DISCORD_CLASSIC", "• 🛺🟣 \`Discord Classic\`")

        if (nitroBadge.includes("gif")) {
            flags = flags + `
    • 🟣🔮 \`Nitro\``
        }

        let stat = user.presence.activities[0]
        let custom

        if (user.presence.activities.some(r => r.name === "Spotify")) {
            custom = "Listening to Spotify"
        } else if (stat && stat.name !== "Custom Status") {
            custom = stat.name
        } else {
            custom = "Nothing"
        }

        if (user.presence.activities.some(r => r.name !== "Spotify") && stat && stat.state !== null) {
            stat = stat.state
        } else {
            stat = "Nothing"
        }
        
        if (user.lastMessage) {
            lastMessage = user.lastMessage.content
            lastMessageTime = moment(user.lastMessage.createdTimestamp).format('MMMM Do YYYY, H:mm:ss a')
        } else {
            lastMessage = "None"
            lastMessageTime = "None"
        }

        const embeddd = new Discord.MessageEmbed()
            .setColor(0x36393E)
            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
            .setDescription(`__**User Info**__
         **•** \`ID:\` **${user.id}**
         **•** \`Profile:\` **${user}**
         **•** \`Bot:\` **${user.user.bot ? 'Yes' : 'No'}**
         **•** \`Created At:\` **${moment(user.user.createdAt).format('MMMM Do YYYY, H:mm:ss a')}**
        __**Member Info**__
        **•** \`Nickname:\` **${user.displayName ? user.displayName : 'yok'} **
        **•** \`Joined At:\` **${moment(user.joinedAt).format('MMMM Do YYYY, H:mm:ss a')}**
        **•** \`Activity:\` **${custom}**
        **•** \`Api Key:\` **${api || "None"}**
        __**Roles:**__
           ${roles}
        __**Messages Info**__
        **•** \`Last Message:\` **${lastMessage}**
        **•** \`Last Message At:\` **${lastMessageTime}**
        __**Badge Information**__
        ${flags} 
    
         __**Safety Check**__
        • ${safe}`)
            .setThumbnail(user.user.avatarURL({ dynamic: true }))
            .setTimestamp()

        message.channel.send(embeddd)
    }
}