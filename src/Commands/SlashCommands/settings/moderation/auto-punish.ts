import * as Discord from 'discord.js';
import * as ch from '../../../../BaseClient/ClientHelper.js';
import type * as DBT from '../../../../Typings/DataBaseTypings';
import type * as CT from '../../../../Typings/CustomTypings';

export default async (cmd: Discord.ChatInputCommandInteraction) => {
  if (!cmd.inGuild()) return;

  const language = await ch.languageSelector(cmd.guild?.id);
  const lan = language.slashCommands.settings.categories['auto-punish'];

  const ID = cmd.options.get('id', false)?.value as string;
  if (ID) {
    showID(cmd, ID, language, lan);
    return;
  }
  showAll(cmd, language, lan);
};

const showID = async (
  cmd: Discord.ChatInputCommandInteraction,
  ID: string,
  language: CT.Language,
  lan: CT.Language['slashCommands']['settings']['categories']['auto-punish'],
) => {
  const { buttonParsers, embedParsers } = ch.settingsHelpers;
  const settings = await ch
    .query(
      `SELECT * FROM ${ch.constants.commands.settings.tableNames['auto-punish']} WHERE uniquetimestamp = $1;`,
      [parseInt(ID, 36)],
    )
    .then((r: DBT.autopunish[] | null) => (r ? r[0] : null));

  cmd.reply({
    embeds: await getEmbeds(embedParsers, settings, language, lan),
    components: await getComponents(buttonParsers, settings, language),
    ephemeral: true,
  });
};

const showAll = async (
  cmd: Discord.ChatInputCommandInteraction,
  language: CT.Language,
  lan: CT.Language['slashCommands']['settings']['categories']['auto-punish'],
) => {
  const name = 'auto-punish';
  const { multiRowHelpers } = ch.settingsHelpers;
  const settings = await ch
    .query(
      `SELECT * FROM ${ch.constants.commands.settings.tableNames['auto-punish']} WHERE guildid = $1;`,
      [cmd.guild?.id],
    )
    .then((r: DBT.autopunish[] | null) => r || null);

  const fields = settings?.map((s) => ({
    name: `${lan.fields.warnamount.name}: \`${s.warnamount ?? language.None}\` - ${
      lan.fields.punishment.name
    }: \`${
      s.punishment
        ? language.punishments[s.punishment as keyof typeof language.punishments]
        : language.None
    }\``,
    value: `${s.active ? ch.stringEmotes.enabled : ch.stringEmotes.disabled} - ID: \`${Number(
      s.uniquetimestamp,
    ).toString(36)}\``,
  }));

  const embeds = multiRowHelpers.embeds(fields, language, lan);
  const components = multiRowHelpers.options(language, name);
  multiRowHelpers.noFields(embeds, language);
  multiRowHelpers.components(embeds, components, language, name);

  cmd.reply({
    embeds,
    components,
    ephemeral: true,
  });
};

export const getEmbeds: CT.SettingsFile<'auto-punish'>['getEmbeds'] = (
  embedParsers,
  settings,
  language,
  lan,
) => [
  {
    author: embedParsers.author(language, lan),
    fields: [
      {
        name: language.slashCommands.settings.active,
        value: embedParsers.boolean(settings?.active, language),
        inline: false,
      },
      {
        name: lan.fields.warnamount.name,
        value: embedParsers.number(settings?.warnamount, language),
        inline: true,
      },
      {
        name: lan.fields.punishment.name,
        value: settings?.punishment
          ? language.punishments[settings?.punishment as keyof typeof language.punishments]
          : language.None,
        inline: true,
      },
      {
        name: lan.fields.duration.name,
        value: embedParsers.time(Number(settings?.duration) * 1000, language),
        inline: true,
      },
      {
        name: lan.fields.confirmationreq.name,
        value: embedParsers.boolean(settings?.confirmationreq, language),
        inline: true,
      },
      {
        name: lan.fields.punishmentawaittime.name,
        value: embedParsers.time(Number(settings?.punishmentawaittime) * 1000, language),
        inline: true,
      },
      {
        name: lan.fields.addroles.name,
        value: embedParsers.roles(settings?.addroles, language),
        inline: false,
      },
      {
        name: lan.fields.removeroles.name,
        value: embedParsers.roles(settings?.removeroles, language),
        inline: false,
      },
    ],
  },
];

export const getComponents: CT.SettingsFile<'auto-punish'>['getComponents'] = (
  buttonParsers,
  settings,
  language,
  name = 'auto-punish',
) => [
  {
    type: Discord.ComponentType.ActionRow,
    components: [
      buttonParsers.global(language, !!settings?.active, 'active', name, settings?.uniquetimestamp),
    ],
  },
  {
    type: Discord.ComponentType.ActionRow,
    components: [
      buttonParsers.specific(
        language,
        settings?.warnamount,
        'warnamount',
        name,
        settings?.uniquetimestamp,
      ),
      buttonParsers.specific(
        language,
        settings?.punishment,
        'punishment',
        name,
        settings?.uniquetimestamp,
      ),
      buttonParsers.specific(
        language,
        settings?.duration,
        'duration',
        name,
        settings?.uniquetimestamp,
      ),
    ],
  },
  {
    type: Discord.ComponentType.ActionRow,
    components: [
      buttonParsers.boolean(
        language,
        settings?.confirmationreq,
        'confirmationreq',
        name,
        settings?.uniquetimestamp,
      ),
      buttonParsers.specific(
        language,
        settings?.punishmentawaittime,
        'punishmentawaittime',
        name,
        settings?.uniquetimestamp,
      ),
    ],
  },
  {
    type: Discord.ComponentType.ActionRow,
    components: [
      buttonParsers.specific(
        language,
        settings?.addroles,
        'addroles',
        name,
        settings?.uniquetimestamp,
        'role',
      ),
      buttonParsers.specific(
        language,
        settings?.removeroles,
        'removeroles',
        name,
        settings?.uniquetimestamp,
        'role',
      ),
    ],
  },
];
