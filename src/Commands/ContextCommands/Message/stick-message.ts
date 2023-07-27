import type * as Discord from 'discord.js';
import * as ch from '../../../BaseClient/ClientHelper.js';

export default async (cmd: Discord.MessageContextMenuCommandInteraction) => {
 if (!cmd.inCachedGuild()) return;

 await ch.DataBase.stickymessages.upsert({
  where: { channelid: cmd.channelId },
  create: {
   guildid: cmd.guildId,
   lastmsgid: cmd.targetId,
   channelid: cmd.channelId,
   userid: cmd.user.id,
  },
  update: {},
 });

 const res = await ch.DataBase.stickymessages.findUnique({
  where: { channelid: cmd.channelId },
 });

 const language = await ch.languageSelector(cmd.guildId);
 const lan = language.contextCommands.message['Stick Message'];

 ch.replyCmd(cmd, {
  content: res?.lastmsgid === cmd.targetId ? lan.reply : lan.already,
 });
};
