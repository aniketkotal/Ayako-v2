import * as Discord from 'discord.js';
import { glob } from 'glob';

// eslint-disable-next-line no-console
const { log } = console;

export default async (cmd: Discord.Interaction) => {
 if (!cmd.isChatInputCommand()) return;
 if (cmd.inGuild() && !cmd.inCachedGuild()) return;

 const files = await glob(
  `${process.cwd()}${process.cwd().includes('dist') ? '' : '/dist'}/Commands/**/*`,
 );

 const subcommandGroup = cmd.options.data.find(
  (c) => c.type === Discord.ApplicationCommandOptionType.SubcommandGroup,
 );
 const subcommand = (subcommandGroup?.options ?? cmd.options.data).find(
  (c) => c.type === Discord.ApplicationCommandOptionType.Subcommand,
 );

 const path = () => {
  const pathArgs: string[] = [];

  if (cmd.commandName) pathArgs.push(cmd.commandName);
  if (subcommandGroup?.name) pathArgs.push(subcommandGroup?.name);
  if (subcommand?.name) pathArgs.push(subcommand?.name);

  return pathArgs.join('/');
 };

 log(path());

 const command = files.find((f) => f.endsWith(`/SlashCommands/${path()}.js`));
 if (!command) return;

 const commandName = command.split(/\//g).pop() as string;
 const cooldown = cmd.client.util.cache.cooldown
  .get(cmd.channelId)
  ?.get(
   commandName ||
    (cmd.client.util.constants.commands.interactions.find((c) => c.name === commandName)
     ? 'interactions'
     : ''),
  );

 if (cooldown) {
  const language = await cmd.client.util.getLanguage(cmd.guildId);
  cmd.client.util.errorCmd(
   cmd,
   language.events.interactionCreate.cooldown(cmd.client.util.moment(cooldown, language)),
   language,
  );
  return;
 }

 (await import(command)).default(cmd);
};
