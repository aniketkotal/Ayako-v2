import type * as Discord from 'discord.js';
import Prisma from '@prisma/client';
import type * as ch from '../BaseClient/ClientHelper.js';

export type Language = import('../BaseClient/Other/language.js').default;

export interface Command<T extends boolean | undefined> {
 takesFirstArg: boolean;
 thisGuildOnly: string[];
 dmOnly: boolean;
 dmAllowed: T;
 type: 'mod' | 'other' | 'owner';
 requiresSlashCommand: boolean;
 default: (
  msg: Discord.Message<T extends true ? false : true>,
  args: string[],
  {
   language,
   command,
   prefix,
  }: {
   language: Language;
   command: Command;
   prefix: string;
  },
 ) => void | Promise<void>;
}

export type AcceptedMergingTypes = 'string' | 'boolean' | 'difference' | 'icon' | 'image';

export interface TopGGBotVote {
 bot: string;
 user: string;
 type: 'upvote' | 'test';
 isWeekend: boolean;
 query?: string;
 authorization: string;
}

export interface TopGGGuildVote {
 guild: string;
 user: string;
 type: 'upvote' | 'test';
 query?: string;
 authorization: string;
}

export type TableNamesMap = {
 shop: Prisma.shop;
 'shop-items': Prisma.shopitems;
 'anti-spam': Prisma.antispam;
 'anti-raid': Prisma.antiraid;
 'denylist-rules': Prisma.denylistrules;
 'anti-virus': Prisma.antivirus;
 'auto-punish': Prisma.autopunish;
 censor: Prisma.censor;
 'auto-roles': Prisma.autoroles;
 cooldowns: Prisma.cooldowns;
 expiry: Prisma.expiry;
 'disboard-reminders': Prisma.disboard;
 'self-roles': Prisma.selfroles;
 separators: Prisma.roleseparator;
 sticky: Prisma.sticky;
 verification: Prisma.verification;
 welcome: Prisma.welcome;
 leveling: Prisma.leveling;
 nitro: Prisma.nitrosettings;
 suggestions: Prisma.suggestionsettings;
 logs: Prisma.logchannels;
 basic: Prisma.guildsettings;
 'multi-channels': Prisma.levelingmultichannels;
 'multi-roles': Prisma.levelingmultiroles;
 'level-roles': Prisma.levelingroles;
 'rule-channels': Prisma.levelingruleschannels;
 'booster-roles': Prisma.nitroroles;
 vote: Prisma.votesettings;
 'vote-rewards': Prisma.voterewards;
 'reaction-role-settings': Prisma.reactionrolesettings;
 'button-role-settings': Prisma.buttonrolesettings;
 'reaction-roles': Prisma.reactionroles;
 'button-roles': Prisma.buttonroles;
 'role-rewards': Prisma.rolerewards;
 invites: Prisma.invites;
 newlines: Prisma.newlines;
 'voice-hubs': Prisma.voicehubs;
 'appeal-settings': Prisma.appealsettings;
 questions: Prisma.appealquestions;
};

export interface AutoCompleteFile {
 default: (
  cmd: Discord.AutocompleteInteraction<'cached'> | { guild: Discord.Guild },
 ) => Promise<{ name: string; value: string }[] | undefined>;
}

export interface SettingsFile<K extends keyof TableNamesMap> {
 getEmbeds: (
  embedParsers: (typeof ch)['settingsHelpers']['embedParsers'],
  settings: TableNamesMap[K],
  language: Language,
  lan: Language['slashCommands']['settings']['categories'][K],
  guild: Discord.Guild,
 ) => Discord.APIEmbed[] | Promise<Discord.APIEmbed[]>;
 getComponents: (
  buttonParsers: (typeof ch)['settingsHelpers']['buttonParsers'],
  settings: TableNamesMap[K],
  language: Language,
 ) =>
  | Discord.APIActionRowComponent<Discord.APIMessageActionRowComponent>[]
  | Promise<Discord.APIActionRowComponent<Discord.APIMessageActionRowComponent>[]>;
 showAll?: (
  cmd: Discord.ChatInputCommandInteraction<'cached'> | Discord.ButtonInteraction<'cached'>,
  language: Language,
  lan: Language['slashCommands']['settings']['categories'][K],
 ) => Promise<void>;
 showID?: (
  cmd: Discord.ChatInputCommandInteraction<'cached'> | Discord.ButtonInteraction<'cached'>,
  ID: string,
  language: Language,
  lan: Language['slashCommands']['settings']['categories'][K],
 ) => Promise<void>;
 postChange?: (
  oldSetting: TableNamesMap[K] | undefined,
  newSetting: TableNamesMap[K] | undefined,
  changedSetting: keyof TableNamesMap[K],
  guild: Discord.Guild,
  uniquetimestamp?: number | string,
 ) => Promise<void>;
}

type AllKeys<T> = T extends T ? keyof T : never;
type FilterSettings<T, K extends AllKeys<T>> = Extract<T, Record<K, unknown>>;

type SuccessfulTopGGResponse = {
 username: string;
 id: string;
 discriminator: string;
 avatar: string;
 defAvatar: string;
 prefix: string;
 shortdesc: string;
 longdesc: string;
 tags?: string[];
 website: string;
 support: string;
 github: string;
 owners: string[];
 guilds: string[];
 invite: string;
 date: string;
 server_count: number;
 shard_count: string;
 certifiedBot: string;
 vanity: string;
 points: number;
 monthlyPoints: number;
 donatebotguildid: string;
};

type FailedTopGGResponse = { error: string };

export type TopGGResponse<T extends boolean> = T extends true
 ? SuccessfulTopGGResponse
 : FailedTopGGResponse;

export type TokenResponse = {
 access_token: string;
 expires_in: number;
 refresh_token: string;
 scope: string;
 token_type: string;
};

export type RawUser = {
 id: string;
 username: string;
 global_name: null;
 display_name: null;
 avatar: string;
 discriminator: string;
 public_flags: number;
 flags: number;
 banner: string;
 banner_color: null;
 accent_color: null;
 locale: string;
 mfa_enabled: boolean;
 premium_type: number;
 avatar_decoration: string;
 email: string;
 verified: boolean;
};

export type Appeal = {
 userid: string;
 guildid: string;
 punishmentid: string;
 questions: string[];
 answers: string[];
 answertypes: Prisma.appealquestions['answertype'][];
};

export type Onboarding = {
 guildId: Discord.Snowflake;
 defaultChannelIds: Discord.Snowflake[];
 enabled: boolean;
 prompts: {
  id: Discord.Snowflake;
  type: 0 | 1; // MULTIPLE_CHOICE | DROPDOWN
  options: {
   id: Discord.Snowflake;
   channelIds: Discord.Snowflake[];
   roleIds: Discord.Snowflake[];
   title: string;
   description?: string;
  }[];
  title: string;
  singleSelect: boolean;
  required: boolean;
  inOnboarding: boolean;
 }[];
};

export enum ModTypes {
 RoleAdd = 'roleAdd',
 RoleRemove = 'roleRemove',
 TempMuteAdd = 'tempMuteAdd',
 MuteRemove = 'muteRemove',
 BanAdd = 'banAdd',
 SoftBanAdd = 'softBanAdd',
 TempBanAdd = 'tempBanAdd',
 ChannelBanAdd = 'channelBanAdd',
 TempChannelBanAdd = 'tempChannelBanAdd',
 ChannelBanRemove = 'channelBanRemove',
 BanRemove = 'banRemove',
 KickAdd = 'kickAdd',
 WarnAdd = 'warnAdd',
 SoftWarnAdd = 'softWarnAdd',
 StrikeAdd = 'strikeAdd',
 UnAfk = 'unAfk',
}

type BaseOptions = {
 reason: string;
 dbOnly: boolean;
 guild: Discord.Guild;
 target: Discord.User;
 executor: Discord.User;
 skipChecks: boolean;
};

type Channel = {
 channel:
  | Discord.NewsChannel
  | Discord.StageChannel
  | Discord.TextChannel
  | Discord.VoiceChannel
  | Discord.ForumChannel
  | Discord.MediaChannel;
};

type Roles = { roles: Discord.Role[] };
type Temp = { duration: number };
type Empty = NonNullable<unknown>;
type DeleteMessageSeconds = { deleteMessageSeconds: number };

type SpecificOpts = {
 [ModTypes.RoleAdd]: Roles;
 [ModTypes.RoleRemove]: Roles;
 [ModTypes.TempMuteAdd]: Temp;
 [ModTypes.MuteRemove]: Empty;
 [ModTypes.BanAdd]: DeleteMessageSeconds;
 [ModTypes.SoftBanAdd]: DeleteMessageSeconds;
 [ModTypes.TempBanAdd]: Temp & DeleteMessageSeconds;
 [ModTypes.ChannelBanAdd]: Channel;
 [ModTypes.TempChannelBanAdd]: Channel & Temp;
 [ModTypes.ChannelBanRemove]: Channel;
 [ModTypes.BanRemove]: Empty;
 [ModTypes.KickAdd]: Empty;
 [ModTypes.WarnAdd]: Empty;
 [ModTypes.SoftWarnAdd]: Empty;
 [ModTypes.StrikeAdd]: Empty;
 [ModTypes.UnAfk]: Empty;
};

type SpecificOptions = {
 [K in ModTypes]: SpecificOpts[K];
};

export type ModOptions<T extends ModTypes> = BaseOptions & SpecificOptions[T];

export type CommandCategories =
 | 'info'
 | 'utility'
 | 'moderation'
 | 'fun'
 | 'nitro'
 | 'roles'
 | 'vote'
 | 'automation'
 | 'leveling';

export type DePromisify<T> = T extends Promise<infer U> ? U : T;

export type NeverNull<T, K extends keyof T> = {
 [P in keyof T]: P extends K ? NonNullable<T[P]> : T[P];
};

export type UsualMessagePayload = {
 embeds?: Discord.APIEmbed[];
 content?: string;
 components?: Discord.APIActionRowComponent<
  Discord.APIButtonComponent | Discord.APISelectMenuComponent
 >[];
 files?: (Discord.AttachmentPayload | Discord.Attachment)[];
 ephemeral?: boolean;
 allowed_mentions?: Discord.APIAllowedMentions;
};

export type SettingsNames = CT.Language['slashCommands']['settings']['categories'];
export type FieldName<T extends keyof SettingsNames> = SettingsNames[T]['fields'];
export type BLWLType =
 | 'blchannelid'
 | 'blroleid'
 | 'bluserid'
 | 'wlchannelid'
 | 'wlroleid'
 | 'wluserid';
export type MentionTypes =
 | 'rolemode'
 | 'channel'
 | 'role'
 | 'user'
 | 'mention'
 | 'punishment'
 | 'language'
 | 'settinglink'
 | 'embed'
 | 'emote'
 | 'commands'
 | 'automodrules'
 | 'shoptype'
 | 'auto-punishment'
 | 'antiraid-punishment'
 | 'questions';

export type HelpCommand =
 | {
    parentCommand: string;
    subCommandGroup: string;
    subCommand: string;
   }
 | {
    parentCommand: string;
    subCommand: string;
    subCommandGroup?: undefined;
   }
 | {
    parentCommand: string;
    subCommandGroup?: undefined;
    subCommand?: undefined;
   };
