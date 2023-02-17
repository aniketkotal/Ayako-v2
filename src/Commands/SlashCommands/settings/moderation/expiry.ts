import * as Discord from 'discord.js';
import * as ch from '../../../../BaseClient/ClientHelper.js';
import type * as DBT from '../../../../Typings/DataBaseTypings';
import type * as CT from '../../../../Typings/CustomTypings';

export default async (cmd: Discord.ChatInputCommandInteraction) => {
  if (!cmd.inGuild()) return;

  const language = await ch.languageSelector(cmd.guild?.id);
  const lan = language.slashCommands.settings.categories.expiry;
  const { embedParsers, buttonParsers } = ch.settingsHelpers;
  const settings = await ch
    .query(
      `SELECT * FROM ${ch.constants.commands.settings.tableNames.expiry} WHERE guildid = $1;`,
      [cmd.guild?.id],
    )
    .then((r: DBT.expiry[] | null) => (r ? r[0] : null));

  cmd.reply({
    embeds: getEmbeds(embedParsers, settings, language, lan),
    components: getComponents(buttonParsers, settings, language),
    ephemeral: true,
  });
};

export const getEmbeds = (
  embedParsers: (typeof ch)['settingsHelpers']['embedParsers'],
  settings: DBT.expiry | null,
  language: CT.Language,
  lan: CT.Language['slashCommands']['settings']['categories']['expiry'],
): Discord.APIEmbed[] => [
  {
    author: embedParsers.author(language, lan),
    fields: [
      {
        name: lan.fields.bans.name,
        value: embedParsers.boolean(settings?.bans, language),
        inline: true,
      },
      {
        name: lan.fields.banstime.name,
        value: embedParsers.time(Number(settings?.banstime), language),
        inline: true,
      },
      {
        name: '\u200b',
        value: '\u200b',
        inline: false,
      },
      {
        name: lan.fields.channelbans.name,
        value: embedParsers.boolean(settings?.channelbans, language),
        inline: true,
      },
      {
        name: lan.fields.channelbanstime.name,
        value: embedParsers.time(Number(settings?.channelbanstime), language),
        inline: true,
      },
      {
        name: '\u200b',
        value: '\u200b',
        inline: false,
      },
      {
        name: lan.fields.kicks.name,
        value: embedParsers.boolean(settings?.kicks, language),
        inline: true,
      },
      {
        name: lan.fields.kickstime.name,
        value: embedParsers.time(Number(settings?.kickstime), language),
        inline: true,
      },
      {
        name: '\u200b',
        value: '\u200b',
        inline: false,
      },
      {
        name: lan.fields.mutes.name,
        value: embedParsers.boolean(settings?.mutes, language),
        inline: true,
      },
      {
        name: lan.fields.mutestime.name,
        value: embedParsers.time(Number(settings?.mutestime), language),
        inline: true,
      },
      {
        name: '\u200b',
        value: '\u200b',
        inline: false,
      },
      {
        name: lan.fields.warns.name,
        value: embedParsers.boolean(settings?.warns, language),
        inline: true,
      },
      {
        name: lan.fields.warnstime.name,
        value: embedParsers.time(Number(settings?.warnstime), language),
        inline: true,
      },
    ],
  },
];

const getComponents = (
  buttonParsers: (typeof ch)['settingsHelpers']['buttonParsers'],
  settings: DBT.expiry | null,
  language: CT.Language,
  name: 'expiry' = 'expiry',
): Discord.APIActionRowComponent<Discord.APIMessageActionRowComponent>[] => [
  {
    type: Discord.ComponentType.ActionRow,
    components: [
      buttonParsers.boolean(language, settings?.bans, 'bans', name),
      buttonParsers.boolean(language, settings?.channelbans, 'channelbans', name),
      buttonParsers.boolean(language, settings?.kicks, 'kicks', name),
      buttonParsers.boolean(language, settings?.mutes, 'mutes', name),
      buttonParsers.boolean(language, settings?.warns, 'warns', name),
    ],
  },
  {
    type: Discord.ComponentType.ActionRow,
    components: [
      buttonParsers.specific(language, settings?.banstime, 'banstime', name),
      buttonParsers.specific(language, settings?.channelbanstime, 'channelbanstime', name),
      buttonParsers.specific(language, settings?.kickstime, 'kickstime', name),
      buttonParsers.specific(language, settings?.mutestime, 'mutestime', name),
      buttonParsers.specific(language, settings?.warnstime, 'warnstime', name),
    ],
  },
];
