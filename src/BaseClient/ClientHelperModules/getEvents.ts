import { glob } from 'glob';
import * as Discord from 'discord.js';

type EventValues = `${Discord.Events}`;

export const gatewayEvents: (EventValues | string)[] = [
 'applicationCommandPermissionsUpdate',
 'autoModerationActionExecution',
 'autoModerationRuleCreate',
 'autoModerationRuleDelete',
 'autoModerationRuleUpdate',
 'channelCreate',
 'channelDelete',
 'channelPinsCreate',
 'channelPinsDelete',
 'channelPinsUpdate',
 'channelUpdate',
 'debug',
 'emojiCreate',
 'emojiDelete',
 'emojiUpdate',
 'error',
 'guildBanAdd',
 'guildBanRemove',
 'guildCreate',
 'guildDelete',
 'guildIntegrationsCreates',
 'guildIntegrationsDeletes',
 'guildIntegrationsUpdate',
 'guildIntegrationsUpdates',
 'guildMemberAdd',
 'guildMemberPrune',
 'guildMemberRemove',
 'guildMemberUpdate',
 'guildScheduledEventCreate',
 'guildScheduledEventDelete',
 'guildScheduledEventUpdate',
 'guildScheduledEventUserAdd',
 'guildScheduledEventUserRemove',
 'guildAuditLogEntryCreate',
 'guildUpdate',
 'interactionCreate',
 'inviteCreate',
 'inviteDelete',
 'messageCreate',
 'messageDelete',
 'messageDeleteBulk',
 'messageReactionAdd',
 'messageReactionRemove',
 'messageReactionRemoveAll',
 'messageReactionRemoveEmoji',
 'messageUpdate',
 'modBaseEvent',
 'modSourceHandler',
 'ready',
 'roleCreate',
 'roleDelete',
 'roleUpdate',
 'stageInstanceCreate',
 'stageInstanceDelete',
 'stageInstanceUpdate',
 'stickerCreate',
 'stickerDelete',
 'stickerUpdate',
 'threadCreate',
 'threadDelete',
 'threadMembersUpdate',
 'threadUpdate',
 'typingStart',
 'uncaughtException',
 'unhandledRejection',
 'userUpdate',
 'voiceStateCreates',
 'voiceStateDeletes',
 'voiceStateUpdate',
 'voiceStateUpdates',
 'webhooksCreate',
 'webhooksDelete',
 'webhooksUpdate',
];

export default async (): Promise<typeof gatewayEvents> => {
 const events = await glob(`${process.cwd()}/Events/**/*`);

 const filteredEvents = events
  .filter((path) => path.endsWith('.js'))
  .filter((path) => {
   const eventName = path.replace('.js', '').split(/\/+/).pop();

   if (!eventName) return false;
   if (!gatewayEvents.includes(eventName)) return false;
   return true;
  });

 return filteredEvents;
};
