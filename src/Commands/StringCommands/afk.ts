import * as Discord from 'discord.js';
import afk from '../SlashCommands/afk.js';
import * as CT from '../../Typings/CustomTypings.js';

export const cooldown = 0;
export const takesFirstArg = false;
export const thisGuildOnly = [];
export const dmOnly = false;
export const dmAllowed = false;
export const type = 'other';

const cmd: CT.Command['default'] = async (msg, args) =>
 afk(msg as Discord.Message<true>, args?.join(' ') ?? undefined);

export default cmd;
