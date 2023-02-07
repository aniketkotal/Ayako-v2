import type { QueryResultBase } from 'pg';

export const Res = QueryResultBase;

// Tables
export type afk = {
  userid: string;
  guildid: string;
  text: string;
  since: string;
};

export type antiraid = {
  guildid: string;
  active: boolean;
  punishment: string;
  posttof?: boolean;
  postchannel?: string;
  pingroles?: string[];
  pingusers?: string[];
  time: string;
  jointhreshold: string;
  punishmenttof?: boolean;
};

export type antispam = {
  guildid: string;
  active: boolean;
  wluserid?: string[];
  wlroleid?: string[];
  wlchannelid?: string[];
  forcedisabled?: boolean;
  msgthreshold: string;
  dupemsgthreshold: string;
  timeout: string;
  deletespam: boolean;
};

export type antivirus = {
  guildid: string;
  active: boolean;
  minimize?: string;
  delete?: string;
  minimizetof: boolean;
  deletetof: boolean;
  linklogging: boolean;
  linklogchannels?: string[];
};

export type autopunish = {
  guildid: string;
  uniquetimestamp: string;
  duration?: string;
  warnamount: string;
  punishment?: string;
  active: boolean;
  addroles?: string[];
  removeroles?: string[];
  confirmationreq: boolean;
  punishmentawaittime: string;
};

export type autoroles = {
  guildid: string;
  active: boolean;
  botroleid?: string[];
  userroleid?: string[];
  allroleid?: string[];
};

export type blacklist = {
  active: boolean;
  wlchannelid?: string[];
  wlroleid?: string[];
  wluserid?: string[];
  words?: string[];
  guildid: string;
};

export type cooldowns = {
  command: string;
  cooldown: string;
  active: boolean;
  wlchannelid?: string[];
  wlroleid?: string[];
  wluserid?: string[];
  activechannelid?: string[];
  uniquetimestamp: string;
  guildid: string;
};

export type customembeds = {
  color?: string;
  title?: string;
  url?: string;
  authorname?: string;
  authoricon_url?: string;
  authorurl?: string;
  description?: string;
  thumbnail?: string;
  fieldnames?: string[];
  fieldvalues?: string[];
  fieldinlines?: boolean[];
  image?: string;
  timestamp?: string;
  footertext?: string;
  footericon_url?: string;
  uniquetimestamp: string;
  guildid: string;
  name?: string;
};

export type deletecommands = {
  uniquetimestamp: string;
  guildid: string;
  deletecommand: boolean;
  deletereply: boolean;
  deletetimeout?: string;
  active: boolean;
  command: string;
  wlchannelid: string[];
  activechannelid: string[];
};

export type disboard = {
  guildid: string;
  active: boolean;
  nextbump?: string;
  channelid?: string;
  repeatreminder: string;
  roles?: string[];
  users?: string[];
  tempchannelid?: string;
  deletereply: boolean;
  msgid?: string;
  repeatenabled: boolean;
};

export type giveaways = {
  guildid: string;
  msgid: string;
  description: string;
  winnercount: string;
  endtime: string;
  reqrole?: string;
  actualprize?: string;
  host: string;
  ended: boolean;
  channelid: string;
  participants?: string[];
  collecttime?: number;
};

export type guildsettings = {
  guildid: string;
  prefix?: string;
  interactionsmode: boolean;
  lan: string;
  errorchannel?: string;
  vanity?: string;
};

export type level = {
  userid: string;
  guildid: string | '1';
  type: 'guild' | 'global';
  xp: string;
  level?: string;
};

export type leveling = {
  guildid: string;
  active: boolean;

  xppermsg: string;
  xpmultiplier: string;
  rolemode: boolean;

  lvlupmode?: string;
  lvlupemotes?: (string | string)[];
  lvlupdeltimeout?: string;
  embed?: string;
  lvlupchannels?: string[];

  ignoreprefixes: boolean;
  prefixes?: string[];
  blchannels?: string[];

  blroles?: string[];
  blusers?: string[];
  wlchannels?: string[];
  wlroles?: string[];
  wlusers?: string[];
};

export type levelingmultiplierchannels = {
  guildid: string;
  channels?: string[];
  multiplier: string;
  uniquetimestamp: string;
};

export type levelingmultiroles = {
  guildid: string;
  roles?: string[];
  multiplier: string;
  uniquetimestamp: string;
};

export type levelingroles = {
  guildid: string;
  level?: string;
  roles?: string[];
  uniquetimestamp: string;
};

export type levelingruleschannels = {
  guildid: string;
  channels?: string[];
  rules?: string;
  uniquetimestamp: string;
  hasleastattachments?: string;
  hasmostattachments?: string;
  hasleastcharacters?: string;
  hasmostcharacters?: string;
  hasleastwords?: string;
  hasmostwords?: string;
  mentionsleastusers?: string;
  mentionsmostusers?: string;
  mentionsleastchannels?: string;
  mentionsmostchannels?: string;
  mentionsleastroles?: string;
  mentionsmostroles?: string;
  hasleastlinks?: string;
  hasmostlinks?: string;
  hasleastemotes?: string;
  hasmostemotes?: string;
  hasleastmentions?: string;
  hasmostmentions?: string;
};

export type logchannels = {
  guildid: string;
  applicationevents: string[];
  automodevents: string[];
  channelevents: string[];
  emojievents: string[];
  guildevents: string[];
  scheduledeventevents: string[];
  inviteevents: string[];
  messageevents: string[];
  roleevents: string[];
  stageevents: string[];
  stickerevents: string[];
  typingevents: string[];
  userevents: string[];
  voiceevents: string[];
  webhookevents: string[];
  settingslog: string[];
  modlog: string[];
  reactionevents: string[];
  memberevents: string[];
};

export type expiry = {
  guildid: string;
  bans: boolean;
  channelbans: boolean;
  kicks: boolean;
  mutes: boolean;
  warns: boolean;
  banstime?: string;
  channelbanstime?: string;
  kickstime?: string;
  mutestime?: string;
  warnstime?: string;
};

export type nitroroles = {
  guildid: string;
  uniquetimestamp: string;
  roles?: string[];
  days?: string;
};

export type nitrosettings = {
  guildid: string;
  active: boolean;
  logchannels?: string[];
  rolemode: boolean;
};

export type nitrousers = {
  guildid: string;
  userid: string;
  booststart: string;
  boostend?: string;
  days?: number;
};

export type policy_guilds = {
  guildid: string;
};

export type policy_users = {
  userid: string;
};

export type punish_bans = {
  guildid: string;
  userid: string;
  reason?: string;
  uniquetimestamp: string;
  channelid: string;
  channelname: string;
  executorid: string;
  executorname: string;
  msgid: string;
  duration?: string;
};

export type punish_channelbans = {
  guildid: string;
  userid: string;
  reason?: string;
  uniquetimestamp: string;
  channelid: string;
  channelname: string;
  executorid: string;
  executorname: string;
  msgid: string;
  duration?: string;
  banchannelid: string;
};

export type punish_kicks = {
  guildid: string;
  userid: string;
  reason?: string;
  uniquetimestamp: string;
  channelid: string;
  channelname: string;
  executorid: string;
  executorname: string;
  msgid: string;
};

export type punish_mutes = {
  guildid: string;
  userid: string;
  reason?: string;
  uniquetimestamp: string;
  channelid: string;
  channelname: string;
  executorid: string;
  executorname: string;
  msgid: string;
  duration?: string;
};

export type punish_tempbans = {
  guildid: string;
  userid: string;
  reason?: string;
  uniquetimestamp: string;
  channelid: string;
  channelname: string;
  executorid: string;
  executorname: string;
  msgid: string;
  duration: string;
};

export type punish_tempchannelbans = {
  guildid: string;
  userid: string;
  reason?: string;
  uniquetimestamp: string;
  channelid: string;
  channelname: string;
  executorid: string;
  executorname: string;
  msgid: string;
  duration: string;
  banchannelid: string;
};

export type punish_tempmutes = {
  guildid: string;
  userid: string;
  reason?: string;
  uniquetimestamp: string;
  channelid: string;
  channelname: string;
  executorid: string;
  executorname: string;
  msgid: string;
  duration: string;
};

export type punish_warns = {
  guildid: string;
  userid: string;
  reason?: string;
  uniquetimestamp: string;
  channelid: string;
  channelname: string;
  executorid: string;
  executorname: string;
  msgid: string;
};

export type reminders = {
  userid: string;
  channelid: string;
  reason: string;
  uniquetimestamp: string;
  endtime: string;
  msgid: string;
};

export type roleseparator = {
  guildid: string;
  separator: string;
  active: boolean;
  stoprole?: string;
  isvarying: boolean;
  roles?: string[];
  uniquetimestamp: string;
  name: string;
};

export type roleseparatorsettings = {
  guildid: string;
  stillrunning: boolean;
  channelid?: string;
  messageid?: string;
  duration?: string;
  startat?: string;
  index?: string;
  length?: string;
};

export type rrbuttons = {
  uniquetimestamp: string;
  roles?: string[];
  emoteid?: string;
  buttontext?: string;
  active: boolean;
  messagelink: string;
  guildid: string;
};

export type rrreactions = {
  uniquetimestamp: string;
  emoteid: string;
  roles?: string[];
  active: boolean;
  messagelink: string;
  guildid: string;
};

export type rrsettings = {
  guildid: string;
  messagelink: string;
  uniquetimestamp: string;
  name: string;
  onlyone?: boolean;
  active: boolean;
  anyroles?: string[];
};

export type selfroles = {
  guildid: string;
  roles?: string[];
  onlyone: boolean;
  uniquetimestamp: string;
  blroles?: string[];
  blusers?: string[];
  wlroles?: string[];
  wlusers?: string[];
  active: boolean;
  name: string;
};

export type stats = {
  usercount: string;
  guildcount: string;
  channelcount: string;
  rolecount: string;
  allusers: string;
  willis?: string[];
  count?: string;
  antispam: boolean;
  verbosity: boolean;
  heartbeat: string;
};

export type statschannel = {
  guildid: string;
  channelid: string;
  type?: string;
};

export type sticky = {
  guildid: string;
  roles?: string[];
  stickyrolesmode: boolean;
  stickyrolesactive: boolean;
  stickypermsactive: boolean;
};

export type stickypermmembers = {
  userid: string;
  guildid: string;
  channelid: string;
  denybits?: bigint;
  allowbits?: bigint;
};

export type stickyrolemembers = {
  userid: string;
  guildid: string;
  roles: string[];
};

export type suggestionsettings = {
  guildid: string;
  active: boolean;
  channelid?: string;
  novoteroles?: string[];
  novoteusers?: string[];
  approverroleid?: string[];
  anonvote: boolean;
  anonsuggestion: boolean;
  nosendroles?: string[];
  nosendusers?: string[];
};

export type suggestionvotes = {
  guildid: string;
  msgid: string;
  authorid: string;
  downvoted?: string[];
  upvoted?: string[];
  ended?: boolean;
};

export type users = {
  userid: string;
  votereminders?: boolean;
};

export type verification = {
  guildid: string;
  logchannel?: string;
  finishedrole?: string;
  pendingrole?: string;
  startchannel?: string;
  selfstart: boolean;
  kickafter?: string;
  kicktof: boolean;
  active: boolean;
};

export type welcome = {
  guildid: string;
  channelid?: string;
  active: boolean;
  embed: string;
  pingroles?: string[];
  pingusers?: string[];
  pingjoin: boolean;
};

export type levelingmultiplierroles = {
  guildid: string;
  roles?: string[];
  multiplier?: number;
  uniquetimestamp: string;
};

export interface giveawaycollecttime {
  userid: string;
  prize: string;
  msgid: string;
  endtime: number;
  guildid: string;
}

export interface votesettings {
  guildid: string;
  token: string;
  reminders: boolean;
  announcementchannel: string;
}

type rewardtype = 'role' | 'currency' | 'xp' | 'xpmultiplier';

export interface voterewards {
  guildid: string;
  uniquetimestamp: string;
  tier: number;
  rewardtype;
  reward: string;
}

export type voters = {
  userid: string;
  removetime: string;
  voted: string;
  votetype: 'guild' | 'bot';
  tier: string;
  rewardtype: rewardtype[];
  reward: string[];
};

export type stickymessages = {
  guildid: string;
  uniquetimestamp: string;
  lastmsgid: string;
  channelid: strin;
};
