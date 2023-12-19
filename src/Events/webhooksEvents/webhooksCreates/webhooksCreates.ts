import type * as Discord from 'discord.js';
import log from './log.js';
import * as ch from '../../../BaseClient/ClientHelper.js';

export default async (
 webhook: Discord.Webhook,
 channel: Discord.TextChannel | Discord.NewsChannel | Discord.VoiceChannel | Discord.ForumChannel,
) => {
 console.log(webhook);
 ch.cache.webhooks.set(webhook);
 log(webhook, channel);
};
