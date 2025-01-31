import * as Discord from 'discord.js';
import * as Classes from '../../../Other/classes.js';
import error from '../../error.js';

import getBotMemberFromGuild from '../../getBotMemberFromGuild.js';
import requestHandlerError from '../../requestHandlerError.js';
import { getAPI } from './addReaction.js';

/**
 * Retrieves the webhooks for a given guild text-based channel or forum channel.
 * @param channel - The guild text-based channel or forum channel to retrieve webhooks for.
 * @returns A promise that resolves with an array of webhooks for the given channel.
 */
export default async (
 channel: Discord.GuildTextBasedChannel | Discord.ForumChannel | Discord.MediaChannel,
) => {
 if (!canGetWebhooks(channel.id, await getBotMemberFromGuild(channel.guild))) {
  const e = requestHandlerError(`Cannot get webhooks in ${channel.name} / ${channel.id}`, [
   Discord.PermissionFlagsBits.ManageWebhooks,
  ]);

  error(channel.guild, e);
  return e;
 }

 return (await getAPI(channel.guild)).channels
  .getWebhooks(channel.id)
  .then((webhooks) => webhooks.map((w) => new Classes.Webhook(channel.client, w)))
  .catch((e: Discord.DiscordAPIError) => {
   error(channel.guild, e);
   return e;
  });
};

/**
 * Checks if the user has permission to get webhooks in a given channel.
 * @param channelId - The ID of the channel to check permissions in.
 * @param me - The user's guild member object.
 * @returns A boolean indicating whether the user has permission to manage webhooks in the channel.
 */
export const canGetWebhooks = (channelId: string, me: Discord.GuildMember) =>
 me.permissionsIn(channelId).has(Discord.PermissionFlagsBits.ManageWebhooks);
