import type * as Discord from 'discord.js';
import * as ch from '../../../BaseClient/ClientHelper.js';

export default (guild: Discord.Guild) => {
 const giveawayClaimTimeouts = ch.cache.giveawayClaimTimeout.cache.get(guild.id);
 const mutes = ch.cache.mutes.cache.get(guild.id);
 const bans = ch.cache.bans.cache.get(guild.id);
 const channelBans = ch.cache.channelBans.cache.get(guild.id);
 const giveaways = ch.cache.giveaways.cache.get(guild.id);

 if (giveawayClaimTimeouts) {
  Array.from(giveawayClaimTimeouts, ([, i]) => i).forEach((i) => i.cancel());
 }
 if (channelBans) {
  Array.from(channelBans, ([, i]) => i).forEach((i) =>
   Array.from(i, ([, g]) => g).forEach((g) => g.cancel()),
  );
 }
 if (mutes) Array.from(mutes, ([, i]) => i).forEach((i) => i.cancel());
 if (bans) Array.from(bans, ([, i]) => i).forEach((i) => i.cancel());
 if (giveaways) {
  Array.from(giveaways, ([, i]) => i).forEach((i) =>
   Array.from(i, ([, g]) => g).forEach((g) => g.cancel()),
  );
 }

 ch.cache.invites.cache.delete(guild.id);
 ch.cache.webhooks.cache.delete(guild.id);
 ch.cache.integrations.cache.delete(guild.id);
 ch.cache.scheduledEventUsers.cache.delete(guild.id);
 ch.cache.welcomeScreens.delete(guild.id);
 ch.cache.pins.cache.delete(guild.id);
 ch.cache.onboarding.delete(guild.id);
 ch.cache.commandPermissions.cache.delete(guild.id);
 ch.cache.auditLogs.cache.delete(guild.id);

 ch.cache.giveawayClaimTimeout.cache.get(guild.id)?.forEach((i) => i.cancel());
 ch.cache.giveawayClaimTimeout.cache.delete(guild.id);
 ch.cache.mutes.cache.get(guild.id)?.forEach((i) => i.cancel());
 ch.cache.mutes.cache.delete(guild.id);
 ch.cache.bans.cache.get(guild.id)?.forEach((i) => i.cancel());
 ch.cache.bans.cache.delete(guild.id);
 ch.cache.channelBans.cache.get(guild.id)?.forEach((i) => i.forEach((j) => j.cancel()));
 ch.cache.channelBans.cache.delete(guild.id);
 ch.cache.disboardBumpReminders.cache.get(guild.id)?.cancel();
 ch.cache.disboardBumpReminders.cache.delete(guild.id);
 ch.cache.giveaways.cache.get(guild.id)?.forEach((i) => i.forEach((j) => j.cancel()));
 ch.cache.giveaways.cache.delete(guild.id);
 ch.cache.deleteThreads.cache.get(guild.id)?.forEach((i) => i.cancel());
 ch.cache.deleteThreads.cache.delete(guild.id);
 ch.cache.apis.delete(guild.id);
 ch.cache.commands.delete(guild.id);
 ch.cache.deleteSuggestions.cache.get(guild.id)?.forEach((i) => i.cancel());
 ch.cache.deleteSuggestions.cache.delete(guild.id);
};
