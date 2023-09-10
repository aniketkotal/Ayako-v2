import type * as Discord from 'discord.js';
import * as ch from '../../../BaseClient/ClientHelper.js';
import guildIntegrationsUpdates from './guildIntegrationsUpdates/guildIntegrationsUpdates.js';
import guildIntegrationsDeletes from './guildIntegrationsDeletes/guildIntegrationsDeletes.js';
import guildIntegrationsCreates from './guildIntegrationsCreates/guildIntegrationsCreates.js';

export default async (guild: Discord.Guild) => {
 const cached = ch.cache.integrations.cache.get(guild.id);
 const fetched = await guild.fetchIntegrations();

 ch.cache.integrations.cache.delete(guild.id);
 fetched.forEach((f) => ch.cache.integrations.set(f, guild.id));
 if (!cached) return;

 const added = fetched.filter((f) => !cached.get(f.id)).map((o) => o);
 const removed = Array.from(cached, ([, f]) => f).filter((f) => !fetched?.get(f.id));
 const changed = ch.getChanged(
  Array.from(cached, ([, f]) => f) as unknown as Record<string, unknown>[],
  fetched.map((o) => o) as unknown as Record<string, unknown>[],
  'id',
 ) as unknown as Discord.Integration[];

 if (added.length) {
  added.forEach(async (add) => guildIntegrationsCreates(add));
 }

 if (removed.length) {
  removed.forEach(async (remove) => guildIntegrationsDeletes(remove));
 }

 if (changed.length) {
  changed.forEach(async (change) =>
   guildIntegrationsUpdates(
    cached.get(change.id) as Discord.Integration,
    fetched.get(change.id) as Discord.Integration,
   ),
  );
 }
};
