import * as Discord from 'discord.js';
import error from '../../error.js';
import { API } from '../../../Bot/Client.js';
import cache from '../../cache.js';

import getBotMemberFromGuild from '../../getBotMemberFromGuild.js';
import requestHandlerError from '../../requestHandlerError.js';

/**
 * Deletes an emoji from a guild.
 * @param guild - The guild where the emoji is located.
 * @param emojiId - The ID of the emoji to delete.
 * @param reason - The reason for deleting the emoji.
 * @returns A promise that resolves with the deleted emoji, or rejects with a DiscordAPIError.
 */
export default async (guild: Discord.Guild, emojiId: string, reason?: string) => {
 if (process.argv.includes('--silent')) return new Error('Silent mode enabled.');

 if (!canDeleteEmoji(await getBotMemberFromGuild(guild))) {
  const e = requestHandlerError(`Cannot delete emoji ${emojiId}`, [
   Discord.PermissionFlagsBits.ManageGuildExpressions,
  ]);

  error(guild, e);
  return e;
 }

 return (cache.apis.get(guild.id) ?? API).guilds
  .deleteEmoji(guild.id, emojiId, { reason })
  .catch((e) => {
   error(guild, e);
   return e as Discord.DiscordAPIError;
  });
};

/**
 * Checks if the given guild member has the permission to delete emojis.
 * @param me - The Discord guild member.
 * @returns A boolean indicating whether the guild member can delete emojis.
 */
export const canDeleteEmoji = (me: Discord.GuildMember) =>
 me.permissions.has(Discord.PermissionFlagsBits.ManageGuildExpressions);
