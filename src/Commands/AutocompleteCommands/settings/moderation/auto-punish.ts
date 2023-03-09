import * as Discord from 'discord.js';
import * as ch from '../../../../BaseClient/ClientHelper.js';
import type * as DBT from '../../../../Typings/DataBaseTypings';

export default async (cmd: Discord.AutocompleteInteraction) => {
  const settings = (
    await ch
      .query(
        `SELECT * FROM ${ch.constants.commands.settings.tableNames['auto-punish']} WHERE guildid = $1;`,
        [cmd.guildId],
      )
      .then((r: DBT.autopunish[] | null) => r)
  )?.filter((s) => {
    const id = String(cmd.options.get('id', false)?.value);

    return id ? Number(s.uniquetimestamp).toString(36).includes(id) : true;
  });

  const language = await ch.languageSelector(cmd.guildId);
  const lan = language.slashCommands.settings.categories['auto-punish'];

  if (!settings) {
    cmd.respond([]);
    return;
  }

  cmd.respond(
    settings?.map((s) => ({
      name: `${lan.fields.warnamount.name}: ${s.warnamount ?? language.None} - ${
        lan.fields.punishment.name
      }: ${
        s.punishment
          ? language.punishments[s.punishment as keyof typeof language.punishments]
          : language.None
      }`,
      value: Number(s.uniquetimestamp).toString(36),
    })),
  );
};
