import * as Discord from 'discord.js';
import { API } from '../../../Client.js';
import { guild as getBotIdFromGuild } from '../../getBotIdFrom.js';
import cache from '../../cache.js';
import * as Classes from '../../../Other/classes.js';
import error from '../../error.js';

/**
 * Overwrites all global application commands for a guild.
 * @param guild - The guild to overwrite the commands for.
 * @param body - The JSON body containing the new commands.
 * @returns A promise that resolves with an array of the newly created application commands.
 */
export default async (guild: Discord.Guild, body: Discord.RESTPutAPIApplicationCommandsJSONBody) =>
 (cache.apis.get(guild.id) ?? API).applicationCommands
  .bulkOverwriteGlobalCommands(await getBotIdFromGuild(guild), body)
  .then((cmds) => {
   const parsed = cmds.map((cmd) => new Classes.ApplicationCommand(guild.client, cmd));
   if (!cache.commands.cache.get(guild.id)) cache.commands.cache.set(guild.id, new Map());
   parsed.forEach((p) => {
    cache.commands.cache.get(guild.id)?.set(p.id, p);

    if (cache.apis.get(guild.id)) return;
    guild.commands.cache.set(p.id, p);
   });

   parsed.forEach((p) => guild.client.application.commands.cache.set(p.id, p));
   return parsed;
  })
  .catch((e) => {
   error(guild, new Error((e as Discord.DiscordAPIError).message));
   return e as Discord.DiscordAPIError;
  });
