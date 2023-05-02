import * as Discord from 'discord.js';
import * as ch from '../../../../BaseClient/ClientHelper.js';
import type * as CT from '../../../../Typings/CustomTypings';
import type * as DBT from '../../../../Typings/DataBaseTypings';

export default async (cmd: Discord.ButtonInteraction, args: string[]) => {
 const fieldName = args.shift();
 if (!fieldName) return;

 const settingName = args.shift() as keyof CT.TableNamesMap;
 if (!settingName) return;

 const tableName = ch.constants.commands.settings.tableNames[
  settingName as keyof typeof ch.constants.commands.settings.tableNames
 ] as keyof CT.TableNamesMap;
 type SettingsType = CT.TableNamesMap[typeof tableName];

 const getUniquetimestamp = () => {
  const arg = args.shift();
  if (arg) return Number(arg);
  return undefined;
 };
 const uniquetimestamp = getUniquetimestamp();

 const currentSetting = (await ch.settingsHelpers.changeHelpers.get(
  tableName,
  fieldName,
  cmd.guildId,
  uniquetimestamp,
 )) as SettingsType;

 const language = await ch.languageSelector(cmd.guildId);
 const lan = language.slashCommands.settings.categories[settingName];

 const embeds = await ch
  .query(`SELECT * FROM customembeds WHERE guildid = $1;`, [cmd.guildId])
  .then((r: DBT.customembeds[] | null) => r ?? null);

 cmd.update({
  embeds: [
   await ch.settingsHelpers.changeHelpers.changeEmbed(
    language,
    lan,
    fieldName,
    currentSetting?.[fieldName as keyof typeof currentSetting],
    'embed',
   ),
  ],
  components: [
   {
    type: Discord.ComponentType.ActionRow,
    components: [
     ch.settingsHelpers.changeHelpers.changeSelect(
      fieldName,
      settingName,
      'embed',
      {
       options: embeds?.map((e) => ({
        label: e.name,
        value: e.uniquetimestamp,
       })) ?? [{ label: '-', value: '-' }],
       disabled: !embeds?.length,
      },
      uniquetimestamp,
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
      'embed',
      language,
      Number(uniquetimestamp),
     ),
    ],
   },
  ],
 });
};
