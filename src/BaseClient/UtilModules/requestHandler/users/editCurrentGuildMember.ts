import * as Discord from 'discord.js';
import { API } from '../../../Bot/Client.js';
import * as Classes from '../../../Other/classes.js';
import cache from '../../cache.js';
import error from '../../error.js';

/**
 * Edits the current guild member with the given data.
 * @param guild The guild where the member is located.
 * @param data The data to update the member with.
 * @param saveGuild - The guild to use if guild is not defined.
 * @returns A promise that resolves with the updated guild member
 * or rejects with a DiscordAPIError.
 */
function fn(
 guild: undefined | null | Discord.Guild,
 data: Discord.RESTPatchAPIGuildMemberJSONBody,
 saveGuild: Discord.Guild,
): Promise<Discord.GuildMember | Discord.DiscordAPIError | Error>;
function fn(
 guild: Discord.Guild,
 data: Discord.RESTPatchAPIGuildMemberJSONBody,
 saveGuild?: undefined,
): Promise<Discord.GuildMember | Discord.DiscordAPIError | Error>;
async function fn(
 guild: undefined | null | Discord.Guild,
 data: Discord.RESTPatchAPIGuildMemberJSONBody,
 saveGuild?: Discord.Guild,
): Promise<Discord.GuildMember | Discord.DiscordAPIError | Error> {
 if (process.argv.includes('--silent')) return new Error('Silent mode enabled.');

 const g = (guild ?? saveGuild)!;

 return ((guild ? cache.apis.get(guild.id) : undefined) ?? API).users
  .editCurrentGuildMember(g.id, data)
  .then((m) => new Classes.GuildMember(g.client, m, g))
  .catch((e) => {
   error(g, e);
   return e as Discord.DiscordAPIError;
  });
};

export default fn;
