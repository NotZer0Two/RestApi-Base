const Discord = require("discord.js");

module.exports = {
  name: "lock",
  description: "info for your anime",

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      return;
    }
    let channel = message.channel;

    const vc1 = args.join(" ");
    channel.overwritePermissions([
      {
        id: message.guild.roles.everyone.id,
        allow: ['SEND_MESSAGES'],
      },
    ], 'unLockdown');
    message.channel.send("This Channel has been unlocked enjoy.")
  }
}