import * as Discord from 'discord.js';
import * as ch from '../../../../BaseClient/ClientHelper.js';
import * as CT from '../../../../Typings/Typings.js';

export enum ChannelTypes {
 Category = 'category',
 Voice = 'voice',
 Text = 'text',
}

export default async (
 cmd: Discord.ButtonInteraction,
 args: string[],
 channelTypes: ChannelTypes = ChannelTypes.Text,
) => {
 if (!cmd.inCachedGuild()) return;

 const fieldName = args.shift();
 if (!fieldName) return;

 const settingName = args.shift() as CT.SettingNames;
 if (!settingName) return;

 const getUniquetimestamp = () => {
  const arg = args.shift();
  if (arg) return Number(arg);
  return undefined;
 };
 const uniquetimestamp = getUniquetimestamp();

 const currentSettings = await ch.settingsHelpers.changeHelpers.get(
  settingName,
  cmd.guildId,
  uniquetimestamp,
 );

 const currentSetting = currentSettings?.[fieldName as keyof typeof currentSettings] as
  | string
  | string[];

 const language = await ch.getLanguage(cmd.guildId);
 cmd.update({
  embeds: [
   await ch.settingsHelpers.changeHelpers.changeEmbed(
    language,
    settingName,
    fieldName,
    currentSettings?.[fieldName as keyof typeof currentSettings],
    CT.EditorTypes.Channel,
    cmd.guild,
   ),
  ],
  components: [
   {
    type: Discord.ComponentType.ActionRow,
    components: [
     ch.settingsHelpers.changeHelpers.changeSelectGlobal(
      language,
      CT.EditorTypes.Channel,
      fieldName,
      settingName,
      uniquetimestamp,
      (Array.isArray(currentSetting) ? currentSetting : [currentSetting]).map((o) => ({
       id: o,
       type: Discord.SelectMenuDefaultValueType.Channel,
      })),
      cmd.guild,
      channelTypes,
     ),
    ],
   },
   {
    type: Discord.ComponentType.ActionRow,
    components: [
     ch.settingsHelpers.changeHelpers.back(settingName, Number(uniquetimestamp)),
     ch.settingsHelpers.changeHelpers.done(
      settingName,
      fieldName,
      CT.EditorTypes.Channel,
      language,
      Number(uniquetimestamp),
     ),
    ],
   },
  ],
 });
};
