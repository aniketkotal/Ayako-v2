import * as Discord from 'discord.js';
import * as ch from '../../../../BaseClient/ClientHelper.js';

export default async (cmd: Discord.ButtonInteraction, args: string[]) => {
 const language = await ch.languageSelector(cmd.guildId);
 const lan = language.slashCommands.embedbuilder.create.start;

 cmd.showModal({
  title: lan.createButtons[args[0] as keyof typeof lan.createButtons],
  customId: `embed-builder/create/editor_${args[0]}`,
  components: [
   {
    type: Discord.ComponentType.ActionRow,
    components: [
     {
      type: Discord.ComponentType.TextInput,
      style: Discord.TextInputStyle.Short,
      customId: 'input',
      label: lan.modals.link.label,
      maxLength: 200,
      minLength: 0,
      placeholder: lan.modals.link.placeholder,
      required: false,
      value: getValue(args[0], cmd),
     },
    ],
   },
  ],
 });
};

const getValue = (arg: string, cmd: Discord.ButtonInteraction) => {
 const embed = cmd.message.embeds[0];
 if (!embed) return '';

 switch (arg) {
  case 'author-url':
   return embed.author?.url ?? '';
  case 'url':
   return embed.url ?? '';
  default:
   return '';
 }
};
