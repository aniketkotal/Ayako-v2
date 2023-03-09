import type * as Discord from 'discord.js';
import type Jobs from 'node-schedule';

/* eslint-disable max-len */
/* eslint-disable no-multi-spaces */
/* eslint-disable prettier/prettier */

import send from './ClientHelperModules/send.js';
import replyMsg from './ClientHelperModules/replyMsg.js';
import replyCmd from './ClientHelperModules/replyCmd.js';
import query from './ClientHelperModules/query.js';
import stp from './ClientHelperModules/stp.js';
import regexes from './ClientHelperModules/regexes.js';
import fileURL2Buffer from './ClientHelperModules/fileURL2Buffer.js';
import memberBoostCalc from './ClientHelperModules/memberBoostCalc.js';
import userFlagsCalc from './ClientHelperModules/userFlagsCalc.js';
import channelRuleCalc from './ClientHelperModules/channelRuleCalc.js';
import permCalc from './ClientHelperModules/permCalc.js';
import getUnix from './ClientHelperModules/getUnix.js';
import getDifference from './ClientHelperModules/getDifference.js';
import languageSelector from './ClientHelperModules/languageSelector.js';
import bitUniques from './ClientHelperModules/bitUniques.js';
import txtFileWriter from './ClientHelperModules/txtFileWriter.js';
import * as util from './ClientHelperModules/util.js';
import errorMsg from './ClientHelperModules/errorMsg.js';
import errorCmd from './ClientHelperModules/errorCmd.js';
import permError from './ClientHelperModules/permError.js';
import notYours from './ClientHelperModules/notYours.js';
import collectorEnd from './ClientHelperModules/collectorEnd.js';
import colorSelector from './ClientHelperModules/colorSelector.js';
import loadingEmbed from './ClientHelperModules/loadingEmbed.js';
import arrayEquals from './ClientHelperModules/arrayEquals.js';
import txtFileLinkToString from './ClientHelperModules/txtFileLinkToString.js';
import getAllInvites from './ClientHelperModules/getAllInvites.js';
import getDiscordEmbed from './ClientHelperModules/getDiscordEmbed.js';
import dynamicToEmbed from './ClientHelperModules/dynamicToEmbed.js';
import embedBuilder from './ClientHelperModules/embedBuilder.js';
import roleManager from './ClientHelperModules/roleManager.js';
import getEmote from './ClientHelperModules/getEmote.js';
import getAudit from './ClientHelperModules/getAudit.js';
import DataBase from './DataBase.js';
import getEmbed from './ClientHelperModules/getEmbed.js';
import getJumpLink from './ClientHelperModules/getJumpLink.js';
import getLogChannels from './ClientHelperModules/getLogChannels.js';
import mergeLogging from './ClientHelperModules/mergeLogging.js';
import getTrueChannelType from './ClientHelperModules/getTrueChannelType.js';
import moment from './ClientHelperModules/moment.js';
import getChanged from './ClientHelperModules/getChanged.js';
import spaces from './ClientHelperModules/spaces.js';
import arrayBufferToBuffer from './ClientHelperModules/arrayBufferToBuffer.js';
import * as getChannel from './ClientHelperModules/getChannel.js';
import getSerializedChannelPerms from './ClientHelperModules/getSerializedChannelPerms.js';
import isManageable from './ClientHelperModules/isManageable.js';
import getEvents from './ClientHelperModules/getEvents.js';
import getNameAndFileType from './ClientHelperModules/getNameAndFileType.js';
import getUser from './ClientHelperModules/getUser.js';
import findUserByName from './ClientHelperModules/findUserByName.js';
import settingsHelpers from './ClientHelperModules/settingsHelpers.js';
import getDuration from './ClientHelperModules/getDuration.js';
import objectEmotes from './ClientHelperModules/objectEmotes.js';
import stringEmotes from './ClientHelperModules/stringEmotes.js';
import reactionEmotes from './ClientHelperModules/reactionEmotes.js';
import cache from './ClientHelperModules/cache.js';
import constants from './Other/constants.js';
import neko from './NekoClient.js';

const mainID = '650691698409734151';
type CQ = Map<string, Map<string, Discord.APIEmbed[]>>;
type CT = Map<string, Map<string, Jobs.Job>>;
const channelQueue: CQ = new Map();
const channelTimeout: CT = new Map();

export {
  send,
  replyMsg,
  replyCmd,
  query,
  stp,
  regexes,
  fileURL2Buffer,
  memberBoostCalc,
  userFlagsCalc,
  channelRuleCalc,
  permCalc,
  getUnix,
  getDifference,
  languageSelector,
  bitUniques,
  txtFileWriter,
  util,
  errorMsg,
  errorCmd,
  permError,
  notYours,
  collectorEnd,
  colorSelector,
  loadingEmbed,
  arrayEquals,
  txtFileLinkToString,
  getAllInvites,
  getDiscordEmbed,
  dynamicToEmbed,
  embedBuilder,
  roleManager,
  getEmote,
  getAudit,
  DataBase,
  getEmbed,
  getJumpLink,
  getLogChannels,
  mergeLogging,
  getTrueChannelType,
  moment,
  getChanged,
  spaces,
  arrayBufferToBuffer,
  getChannel,
  getSerializedChannelPerms,
  isManageable,
  getEvents,
  getNameAndFileType,
  getUser,
  findUserByName,
  settingsHelpers,
  getDuration,
  objectEmotes,
  stringEmotes,
  reactionEmotes,
  cache,
  constants,
  neko,
  mainID,
  channelQueue,
  channelTimeout,
};
