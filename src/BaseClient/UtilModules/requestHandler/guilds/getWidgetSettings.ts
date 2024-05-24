import * as Discord from 'discord.js';
import error from '../../error.js';
import { API } from '../../../Bot/Client.js';
import cache from '../../cache.js';

import getBotMemberFromGuild from '../../getBotMemberFromGuild.js';
import requestHandlerError from '../../requestHandlerError.js';

/**
 * Retrieves the widget settings for a given guild.
 * @param guild - The guild to retrieve the widget settings for.
 * @returns A promise that resolves to an object containing the widget
 * settings (enabled and channelId).
 */
export default async (guild: Discord.Guild) => {
 if (!canGetWidgetSettings(await getBotMemberFromGuild(guild))) {
  const e = requestHandlerError(`Cannot get widget settings`, [
   Discord.PermissionFlagsBits.ManageGuild,
  ]);

  error(guild, e);
  return e;
 }

 return (cache.apis.get(guild.id) ?? API).guilds
  .getWidgetSettings(guild.id)
  .then((w) => ({ enabled: w.enabled, channelId: w.channel_id }))
  .catch((e) => {
   error(guild, e);
   return e as Discord.DiscordAPIError;
  });
};
/**
 * Checks if the given guild member has the permission to get widget settings.
 * @param me - The Discord guild member.
 * @returns True if the guild member has the permission to get widget settings, false otherwise.
 */
export const canGetWidgetSettings = (me: Discord.GuildMember) =>
 me.permissions.has(Discord.PermissionFlagsBits.ManageGuild);
