import * as Discord from 'discord.js';
// eslint-disable-next-line import/no-cycle
import error from '../../error.js';
import { API } from '../../../Client.js';
import cache from '../../cache.js';
import * as Classes from '../../../Other/classes.js';

/**
 * Retrieves the joined private archived threads for a given channel.
 * @param channel - The channel to retrieve the threads for.
 * @param query - The query parameters for the request.
 * @returns A promise that resolves with an array of parsed thread channels.
 */
export default (
 channel: Discord.NewsChannel | Discord.TextChannel | Discord.ForumChannel,
 query: Discord.RESTGetAPIChannelThreadsArchivedQuery,
) =>
 (channel.guild ? cache.apis.get(channel.guild.id) ?? API : API).channels
  .getJoinedPrivateArchivedThreads(channel.id, query)
  .then((res) => {
   const parsed = res.threads.map((t) => Classes.Channel<10>(channel.client, t, channel.guild));
   parsed.forEach((p) => {
    if (channel.threads.cache.get(p.id)) return;
    channel.threads.cache.set(
     p.id,
     p as Discord.ThreadChannel<true> & Discord.ThreadChannel<false>,
    );
   });
   return parsed;
  })
  .catch((e) => {
   error(channel.guild, new Error((e as Discord.DiscordAPIError).message));
   return e as Discord.DiscordAPIError;
  });
