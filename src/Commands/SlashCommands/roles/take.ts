import * as Discord from 'discord.js';
import * as ch from '../../../BaseClient/ClientHelper.js';

export default async (cmd: Discord.ChatInputCommandInteraction) => {
 if (!cmd.inCachedGuild()) return;

 const role = cmd.options.getRole('role', true);
 const user = cmd.options.getUser('user', true);
 const reason = cmd.options.getString('reason', false);
 const language = await ch.languageSelector(cmd.guildId);

 ch.mod(cmd, 'roleRemove', {
  role,
  target: user,
  reason: reason ?? language.noReasonProvided,
  forceFinish: false,
  dbOnly: false,
  guild: cmd.guild,
 });
};
