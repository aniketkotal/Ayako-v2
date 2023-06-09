import type * as Discord from 'discord.js';
import * as ch from '../../../BaseClient/ClientHelper.js';

export default async (cmd: Discord.MessageContextMenuCommandInteraction) => {
 if (!cmd.inCachedGuild()) return;

 const res = await ch.query(
  `INSERT INTO stickymessages (guildid, lastmsgid, channelid) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING RETURNING *;`,
  [cmd.guildId, cmd.targetId, cmd.channelId],
  { returnType: 'stickymessages', asArray: false },
 );

 const language = await ch.languageSelector(cmd.guildId);
 const lan = language.contextCommands.message['Stick Message'];

 ch.replyCmd(cmd, {
  content: res?.lastmsgid === cmd.targetId ? lan.reply : lan.already,
 });
};
