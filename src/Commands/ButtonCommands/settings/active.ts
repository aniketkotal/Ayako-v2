import type * as Discord from 'discord.js';
import glob from 'glob';
import * as ch from '../../../BaseClient/ClientHelper.js';
import type * as CT from '../../../Typings/CustomTypings';

export default async (cmd: Discord.ButtonInteraction, args: string[]) => {
  const settingName = args.shift() as keyof CT.TableNamesMap;
  if (!settingName) return;

  const tableName = ch.constants.commands.settings.tableNames[
    settingName as keyof typeof ch.constants.commands.settings.tableNames
  ] as keyof CT.TableNamesMap;

  const getUniquetimestamp = () => {
    const arg = args.shift();
    if (arg) return Number(arg);
    return undefined;
  };

  const uniquetimestamp = getUniquetimestamp();

  type SettingsType = CT.TableNamesMap[typeof tableName];
  type FilteredSettingsType = CT.FilterSettings<SettingsType, 'active'>;

  const currentSetting = await (uniquetimestamp
    ? ch.query(`SELECT active FROM ${tableName} WHERE uniquetimestamp = $1;`, [uniquetimestamp])
    : ch.query(`SELECT active FROM ${tableName} WHERE guildid = $1;`, [cmd.guildId])
  ).then((r: FilteredSettingsType[] | null) => {
    if (!r) {
      if (uniquetimestamp) {
        return ch
          .query(
            `INSERT INTO ${tableName} (guildid, uniquetimestamp) VALUES ($1) RETURNING active;`,
            [cmd.guildId, Date.now()],
          )
          .then((r: FilteredSettingsType[] | null) => (r ? r[0] : null));
      } else {
        return ch
          .query(`INSERT INTO ${tableName} (guildid) VALUES ($1) RETURNING active;`, [cmd.guildId])
          .then((r: FilteredSettingsType[] | null) => (r ? r[0] : null));
      }
    }

    return r ? r[0] : null;
  });

  const newActive = !currentSetting?.active;

  const updatedSetting = await (uniquetimestamp
    ? ch
        .query(`UPDATE ${tableName} SET active = $1 WHERE uniquetimestamp = $2 RETURNING *;`, [
          uniquetimestamp,
        ])
        .then((r: FilteredSettingsType[] | null) => (r ? r[0] : null))
    : ch
        .query(`UPDATE ${tableName} SET active = $1 WHERE guildid = $2 RETURNING *;`, [
          newActive,
          cmd.guildId,
        ])
        .then((r: FilteredSettingsType[] | null) => (r ? r[0] : null)));

  ch.settingsHelpers.updateLog(
    currentSetting,
    { active: updatedSetting?.active },
    'active',
    settingName,
    uniquetimestamp,
  );

  const files: string[] = await new Promise((resolve) => {
    glob(`${process.cwd()}/Commands/SlashCommands/settings/**/*`, (err, res) => {
      if (err) throw err;
      resolve(res);
    });
  });

  const file = files.find((f) => f.endsWith(`/${settingName}.js`));
  if (!file) return;

  const settingsFile = (await import(file)) as CT.SettingsFile<typeof tableName>;
  const language = await ch.languageSelector(cmd.guildId);

  cmd.update({
    embeds: await settingsFile.getEmbeds(
      ch.settingsHelpers.embedParsers,
      updatedSetting,
      language,
      language.slashCommands.settings.categories[settingName],
    ),
    components: await settingsFile.getComponents(
      ch.settingsHelpers.buttonParsers,
      updatedSetting,
      language,
      settingName,
    ),
  });
};
