import * as Discord from 'discord.js';
import { API } from '../../../Bot/Client.js';
import * as Classes from '../../../Other/classes.js';
import cache from '../../cache.js';
import error from '../../error.js';

import getBotMemberFromGuild from '../../getBotMemberFromGuild.js';
import requestHandlerError from '../../requestHandlerError.js';

/**
 * Returns a promise that resolves with an array of integrations for the given guild.
 * If an error occurs, logs the error and returns the error object.
 * @param guild - The guild to get integrations for.
 * @returns A promise that resolves with an array of integrations for the given guild.
 */
export default async (guild: Discord.Guild) => {
 if (!canGetIntegrations(await getBotMemberFromGuild(guild))) {
  const e = requestHandlerError(`Cannot get integrations`, [
   Discord.PermissionFlagsBits.ManageGuild,
  ]);

  error(guild, e);
  return e;
 }

 return (cache.apis.get(guild.id) ?? API).guilds
  .getIntegrations(guild.id)
  .then((integrations) => integrations.map((i) => new Classes.Integration(guild.client, i, guild)))
  .catch((e) => {
   error(guild, e);
   return e as Discord.DiscordAPIError;
  });
};

/**
 * Checks if the specified guild member has the permission to manage guild integrations.
 * @param me - The guild member to check.
 * @returns A promise that resolves to a boolean,
 * indicating whether the guild member can manage guild integrations.
 */
export const canGetIntegrations = (me: Discord.GuildMember) =>
 me.permissions?.has(Discord.PermissionFlagsBits.ManageGuild);
