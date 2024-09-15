import * as Discord from 'discord.js';
import * as CT from '../../../../Typings/Typings.js';

const settingName = CT.SettingNames.DenylistRules;

export default async (cmd: Discord.ButtonInteraction, args: string[]) => {
 if (!cmd.inCachedGuild()) return;

 const getId = () => {
  const arg = args.shift();
  if (arg) return arg;
  return undefined;
 };
 const id = getId();
 if (!id) {
  cmd.client.util.error(cmd.guild, new Error('No ID found'));
  return;
 }

 const language = await cmd.client.util.getLanguage(cmd.guildId);
 const rule = cmd.guild.autoModerationRules.cache.get(id);
 if (!rule) {
  cmd.client.util.errorCmd(cmd, language.errors.automodRuleNotFound, language);
  return;
 }

 cmd.update({
  embeds: [
   await cmd.client.util.settingsHelpers.changeHelpers.changeEmbed(
    language,
    settingName,
    'exemptRoles',
    rule.exemptRoles.map((c) => c.id),
    CT.EditorTypes.Role,
    cmd.guild,
   ),
  ],
  components: [
   {
    type: Discord.ComponentType.ActionRow,
    components: [
     cmd.client.util.settingsHelpers.changeHelpers.changeSelectGlobal(
      language,
      CT.EditorTypes.Roles,
      CT.AutoModEditorType.Roles,
      settingName,
      id,
      rule.exemptRoles
       .map((c) => c.id)
       .map((o) => ({ id: o, type: Discord.SelectMenuDefaultValueType.Role })),
     ),
    ],
   },
   {
    type: Discord.ComponentType.ActionRow,
    components: [
     {
      type: Discord.ComponentType.Button,
      style: Discord.ButtonStyle.Danger,
      custom_id: `settings/autoModRule/display_${id}`,
      emoji: cmd.client.util.emotes.back,
     },
     cmd.client.util.settingsHelpers.changeHelpers.done(
      settingName,
      'role',
      CT.AutoModEditorType.Roles,
      language,
      id,
     ),
     cmd.client.util.settingsHelpers.changeHelpers.makeEmpty(
      settingName,
      'exemptRoles',
      'autoModRule/array',
      language,
      id,
     ),
    ],
   },
  ],
 });
};
