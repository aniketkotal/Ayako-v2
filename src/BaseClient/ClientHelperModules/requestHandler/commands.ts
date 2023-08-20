import * as Discord from 'discord.js';
import error from '../error.js';
import { API } from '../../Client.js';
import cache from '../cache.js';

export default {
 getGlobalCommands: (
  guild: Discord.Guild,
  appId: string,
  query?: Discord.RESTGetAPIApplicationCommandsQuery,
 ) =>
  (cache.apis.get(guild.id) ?? API).applicationCommands
   .getGlobalCommands(appId, query)
   .catch((e) => {
    error(guild, new Error((e as Discord.DiscordAPIError).message));
   }),
 createGlobalCommand: (
  guild: Discord.Guild,
  appId: string,
  body: Discord.RESTPostAPIApplicationCommandsJSONBody,
 ) =>
  (cache.apis.get(guild.id) ?? API).applicationCommands
   .createGlobalCommand(appId, body)
   .catch((e) => {
    error(guild, new Error((e as Discord.DiscordAPIError).message));
   }),
 getGlobalCommand: (guild: Discord.Guild, appId: string, commandId: string) =>
  (cache.apis.get(guild.id) ?? API).applicationCommands
   .getGlobalCommand(appId, commandId)
   .catch((e) => {
    error(guild, new Error((e as Discord.DiscordAPIError).message));
   }),
 editGlobalCommand: (
  guild: Discord.Guild,
  appId: string,
  commandId: string,
  body: Discord.RESTPatchAPIApplicationCommandJSONBody,
 ) =>
  (cache.apis.get(guild.id) ?? API).applicationCommands
   .editGlobalCommand(appId, commandId, body)
   .catch((e) => {
    error(guild, new Error((e as Discord.DiscordAPIError).message));
   }),
 deleteGlobalCommand: (guild: Discord.Guild, appId: string, commandId: string) =>
  (cache.apis.get(guild.id) ?? API).applicationCommands
   .deleteGlobalCommand(appId, commandId)
   .catch((e) => {
    error(guild, new Error((e as Discord.DiscordAPIError).message));
   }),
 bulkOverwriteGlobalCommands: (
  guild: Discord.Guild,
  appId: string,
  body: Discord.RESTPutAPIApplicationCommandsJSONBody,
 ) =>
  (cache.apis.get(guild.id) ?? API).applicationCommands
   .bulkOverwriteGlobalCommands(appId, body)
   .catch((e) => {
    error(guild, new Error((e as Discord.DiscordAPIError).message));
   }),
 getGuildCommands: (
  guild: Discord.Guild,
  appId: string,
  query: Discord.RESTGetAPIApplicationGuildCommandsQuery,
 ) =>
  (cache.apis.get(guild.id) ?? API).applicationCommands
   .getGuildCommands(appId, guild.id, query)
   .catch((e) => {
    error(guild, new Error((e as Discord.DiscordAPIError).message));
   }),
 createGuildCommand: (
  guild: Discord.Guild,
  appId: string,
  body: Discord.RESTPostAPIApplicationGuildCommandsJSONBody,
 ) =>
  (cache.apis.get(guild.id) ?? API).applicationCommands
   .createGuildCommand(appId, guild.id, body)
   .catch((e) => {
    error(guild, new Error((e as Discord.DiscordAPIError).message));
   }),
 getGuildCommand: (guild: Discord.Guild, appId: string, commandId: string) =>
  (cache.apis.get(guild.id) ?? API).applicationCommands
   .getGuildCommand(appId, guild.id, commandId)
   .catch((e) => {
    error(guild, new Error((e as Discord.DiscordAPIError).message));
   }),
 editGuildCommand: (
  guild: Discord.Guild,
  appId: string,
  commandId: string,
  body: Discord.RESTPatchAPIApplicationGuildCommandJSONBody,
 ) =>
  (cache.apis.get(guild.id) ?? API).applicationCommands
   .editGuildCommand(appId, guild.id, commandId, body)
   .catch((e) => {
    error(guild, new Error((e as Discord.DiscordAPIError).message));
   }),
 deleteGuildCommand: (guild: Discord.Guild, appId: string, commandId: string) =>
  (cache.apis.get(guild.id) ?? API).applicationCommands
   .deleteGuildCommand(appId, guild.id, commandId)
   .catch((e) => {
    error(guild, new Error((e as Discord.DiscordAPIError).message));
   }),
 bulkOverwriteGuildCommands: (
  guild: Discord.Guild,
  appId: string,
  body: Discord.RESTPutAPIApplicationGuildCommandsJSONBody,
 ) =>
  (cache.apis.get(guild.id) ?? API).applicationCommands
   .bulkOverwriteGuildCommands(appId, guild.id, body)
   .catch((e) => {
    error(guild, new Error((e as Discord.DiscordAPIError).message));
   }),
 getGuildCommandPermissions: (guild: Discord.Guild, appId: string, commandId: string) =>
  (cache.apis.get(guild.id) ?? API).applicationCommands
   .getGuildCommandPermissions(appId, guild.id, commandId)
   .catch((e) => {
    error(guild, new Error((e as Discord.DiscordAPIError).message));
   }),
 getGuildCommandsPermissions: (guild: Discord.Guild, appId: string) =>
  (cache.apis.get(guild.id) ?? API).applicationCommands
   .getGuildCommandsPermissions(appId, guild.id)
   .catch((e) => {
    error(guild, new Error((e as Discord.DiscordAPIError).message));
   }),
 editGuildCommandPermissions: (
  guild: Discord.Guild,
  userToken: string,
  appId: string,
  commandId: string,
  body: Discord.RESTPutAPIApplicationCommandPermissionsJSONBody,
 ) =>
  (cache.apis.get(guild.id) ?? API).applicationCommands
   .editGuildCommandPermissions(userToken, appId, guild.id, commandId, body)
   .catch((e) => {
    error(guild, new Error((e as Discord.DiscordAPIError).message));
   }),
};
