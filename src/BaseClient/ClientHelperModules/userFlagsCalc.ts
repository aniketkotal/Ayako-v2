import Discord from 'discord.js';
import stringEmotes from './stringEmotes.js';
import type CT from '../../Typings/CustomTypings';

export default (bits: number, lan: CT.Language, emotes = false) => {
 if (!bits) return [];
 const bitField = new Discord.PermissionsBitField(BigInt(bits));
 const flags = [];

 if (bitField.has(1n)) {
  flags.push(
   `${emotes ? stringEmotes.userFlags.DiscordEmployee : ''} ${lan.userFlags.DiscordEmployee}`,
  );
 }
 if (bitField.has(2n)) {
  flags.push(
   `${emotes ? stringEmotes.userFlags.PartneredServerOwner : ''} ${
    lan.userFlags.PartneredServerOwner
   }`,
  );
 }
 if (bitField.has(4n)) {
  flags.push(
   `${emotes ? stringEmotes.userFlags.HypesquadEvents : ''} ${lan.userFlags.HypesquadEvents}`,
  );
 }
 if (bitField.has(8n)) {
  flags.push(
   `${emotes ? stringEmotes.userFlags.BugHunterLevel1 : ''} ${lan.userFlags.BugHunterLevel1}`,
  );
 }
 if (bitField.has(64n)) {
  flags.push(`${emotes ? stringEmotes.userFlags.HouseBravery : ''} ${lan.userFlags.HouseBravery}`);
 }
 if (bitField.has(128n)) {
  flags.push(
   `${emotes ? stringEmotes.userFlags.HouseBrilliance : ''} ${lan.userFlags.HouseBrilliance}`,
  );
 }
 if (bitField.has(256n)) {
  flags.push(`${emotes ? stringEmotes.userFlags.HouseBalance : ''} ${lan.userFlags.HouseBalance}`);
 }
 if (bitField.has(512n)) {
  flags.push(
   `${emotes ? stringEmotes.userFlags.EarlySupporter : ''} ${lan.userFlags.EarlySupporter}`,
  );
 }
 if (bitField.has(1024n)) {
  flags.push(`${lan.userFlags.TeamUser}`);
 }
 if (bitField.has(2048n)) {
  flags.push(`${emotes ? stringEmotes.userFlags.Bot : ''} ${lan.userFlags.Bot}`);
 }
 if (bitField.has(4096n)) {
  flags.push(`${emotes ? stringEmotes.userFlags.Nitro : ''} ${lan.userFlags.Nitro}`);
 }
 if (bitField.has(16384n)) {
  flags.push(
   `${emotes ? stringEmotes.userFlags.BugHunterLevel2 : ''} ${lan.userFlags.BugHunterLevel2}`,
  );
 }
 if (bitField.has(65536n)) {
  flags.push(`${emotes ? stringEmotes.userFlags.VerifiedBot : ''} ${lan.userFlags.VerifiedBot}`);
 }
 if (bitField.has(131072n)) {
  flags.push(
   `${emotes ? stringEmotes.userFlags.EarlyVerifiedBotDeveloper : ''} ${
    lan.userFlags.VerifiedDeveloper
   }`,
  );
 }
 if (bitField.has(262144n)) {
  flags.push(
   `${emotes ? stringEmotes.userFlags.DiscordCertifiedModerator : ''} ${
    lan.userFlags.CertifiedModerator
   }`,
  );
 }
 if (bitField.has(524288n)) {
  flags.push(`${lan.userFlags.BotHTTPInteractions}`);
 }
 if (bitField.has(1048576n)) {
  flags.push(`${lan.userFlags.Spammer}`);
 }
 if (bitField.has(4194304n)) {
  flags.push(
   `${emotes ? stringEmotes.userFlags.ActiveDeveloper : ''} ${lan.userFlags.ActiveDeveloper}`,
  );
 }
 if (bitField.has(17592186044416n)) {
  flags.push(`${lan.userFlags.Quarantined}`);
 }

 return flags;
};
