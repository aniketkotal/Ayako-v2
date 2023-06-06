import * as Discord from 'discord.js';
import * as ch from '../../../BaseClient/ClientHelper.js';
import { log, pardon } from './one.js';

export default async (
 cmd: Discord.ChatInputCommandInteraction,
 type: 'before' | 'after' = 'before',
) => {
 if (!cmd.inCachedGuild()) return;
 if (!cmd.inGuild()) return;

 const language = await ch.languageSelector(cmd.guildId);
 const lan = language.slashCommands.pardon;

 const user = cmd.options.getUser('target', true);
 const rawDate = cmd.options.getString('date', true);
 const reason = cmd.options.getString('reason', false) ?? language.noReasonProvided;

 if (ch.regexes.dateTester.test(rawDate)) {
  ch.errorCmd(cmd, language.errors.inputNoMatch, language);
  return;
 }

 try {
  new Date(rawDate);
 } catch (e) {
  ch.errorCmd(cmd, (e as Error).message, language);
  return;
 }

 const date = new Date(rawDate).getTime();
 const punishments = await ch.getPunishment(date, type);

 if (!punishments) {
  ch.errorCmd(cmd, language.errors.punishmentNotFound, language);
  return;
 }

 punishments.forEach((p) => {
  pardon(p);
  log(cmd, p, language, lan, reason);
 });

 ch.replyCmd(cmd, {
  content: lan.pardonedMany(
   punishments.map((p) => `\`${Number(p.uniquetimestamp).toString(16)}\``).join(', '),
   user.id,
  ),
 });
};
