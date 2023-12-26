import client from '../../../BaseClient/Client.js';
import * as ch from '../../../BaseClient/ClientHelper.js';

export default async () => {
 const settings = await ch.DataBase.guildsettings.findMany({
  where: {
   token: { not: null },
  },
 });

 settings.forEach(async (s) => {
  if (!s.token) return;

  const guild = client.guilds.cache.get(s.guildid);
  if (!guild) return;

  const globalCommands = async () => {
   if (!s.token) return;

   const commands = await ch.request.commands.getGlobalCommands(guild);

   if ('message' in commands) {
    ch.error(guild, new Error(commands.message));
    return;
   }

   commands.forEach((c) => ch.cache.commands.set(guild.id, c.id, c));
  };

  const guildCommands = async () => {
   if (!s.token) return;

   const commands = await ch.request.commands.getGuildCommands(guild);

   if ('message' in commands) {
    ch.error(guild, new Error(commands.message));
    return;
   }

   commands.forEach((c) => ch.cache.commands.set(guild.id, c.id, c));
  };

  globalCommands();
  guildCommands();
 });
};
