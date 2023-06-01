import * as Discord from 'discord.js';
import StringSimilarity from 'string-similarity';
import * as ch from '../../../BaseClient/ClientHelper.js';

export default async (cmd: Discord.ChatInputCommandInteraction) => {
 const rawCommand = cmd.options.getString('command', true);
 const command =
  cmd.client.application.commands.cache.find((c) => c.name === rawCommand || c.id === rawCommand) ??
  cmd.client.application.commands.cache.find(
   (c) =>
    c.name ===
    StringSimilarity.findBestMatch(
     rawCommand,
     cmd.client.application.commands.cache.map((c2) => c2.name),
    ).bestMatch.target,
  );

 const language = await ch.languageSelector(cmd.guildId);
 const lan = language.slashCommands.help;

 if (!command) {
  ch.errorCmd(cmd, language.errors.commandNotFound, language);
  return;
 }

 const fields = parseOptions(command);

 const embeds: Discord.APIEmbed[] = [
  {
   color: ch.constants.colors.base,
   author: {
    name: lan.author,
   },
   description: `# ${ch.util.makeInlineCode(command?.name ?? '')}${
    ch.constants.commands.help[command?.name as keyof typeof ch.constants.commands.help] ??
    command?.description
     ? `\n> ${
        ch.constants.commands.help[command?.name as keyof typeof ch.constants.commands.help] ??
        command?.description
       }`
     : ''
   }`,
  },
 ];

 const fieldChunks: string[][] = [[]];
 let lastI = 0;
 while (fields.length) {
  while (fieldChunks[lastI].length + Number(fields.at(0)?.length) < 4096) {
   fieldChunks[lastI].push(fields.shift() as string);
  }
  lastI += 1;
  fieldChunks.push([]);
 }

 fieldChunks
  .filter((c) => c.length)
  .forEach((c) => {
   embeds.push({
    description: c.join('\n'),
    color: ch.constants.colors.base,
    footer: {
     text: lan.footer,
    },
   });
  });

 ch.replyCmd(cmd, { embeds });
};

const parseOptions = (
 c: Discord.ApplicationCommandOption | Discord.ApplicationCommand,
 parentWasSubCommandGroup = false,
): string[] => {
 if (!('options' in c)) return [];

 return (
  (c.options as Discord.ApplicationCommandOption[])?.map((c1) => {
   const isSubCommandGroup = c1.type === Discord.ApplicationCommandOptionType.SubcommandGroup;

   switch (c1.type) {
    case Discord.ApplicationCommandOptionType.Subcommand:
    case Discord.ApplicationCommandOptionType.SubcommandGroup: {
     return `${
      isSubCommandGroup || !parentWasSubCommandGroup ? '### ' : '- '
     }${ch.util.makeInlineCode(c1.name)}${isSubCommandGroup ? ' - ' : `\n> `}${ch.util.makeBold(
      ch.constants.commands.help[c1.name as keyof typeof ch.constants.commands.help] ??
       c1.description,
     )}\n${parseOptions(c1, isSubCommandGroup).join('')}`;
    }
    default: {
     return `> ${ch.util.makeInlineCode(
      `${c1.name}${'required' in c1 && c1.required ? '' : '?'}`,
     )}: ${c1.description}\n`;
    }
   }
  }) ?? []
 );
};
