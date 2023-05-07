import * as Discord from 'discord.js';
import client from '../../BaseClient/Client.js';

// Pre-defined values
const name = client.user?.username;

const IDSelector = new Discord.SlashCommandStringOption()
 .setAutocomplete(true)
 .setDescription('The ID of the Setting')
 .setRequired(false)
 .setName('id');

const SearchUsername = new Discord.SlashCommandStringOption()
 .setName('user-name')
 .setDescription(`Username of the User (Searches across all of ${name}'s Servers)`)
 .setRequired(false)
 .setMinLength(2)
 .setAutocomplete(true);

const User = new Discord.SlashCommandUserOption()
 .setName('user')
 .setDescription('The User')
 .setRequired(false);

// Commands

const settings = new Discord.SlashCommandBuilder()
 .setName('settings')
 .setDefaultMemberPermissions(Discord.PermissionFlagsBits.ManageGuild)
 .setDescription(`Manage ${name}'s Settings`)
 .setDMPermission(false)
 .addSubcommandGroup(
  new Discord.SlashCommandSubcommandGroupBuilder()
   .setName('moderation')
   .setDescription(`Everything about ${name}'s Moderation`)
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('anti-spam')
     .setDescription('Stop Members from spamming'),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('anti-spam-punishments')
     .setDescription('The Punishments to use in Anti-Spam')
     .addStringOption(IDSelector),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('anti-virus')
     .setDescription('Stop Members from posting harmful Links'),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('anti-virus-punishments')
     .setDescription('The Punishments to use in Anti-Virus')
     .addStringOption(IDSelector),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('anti-raid')
     .setDescription('Automatically detect Raids and punish Raiders'),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('auto-punish')
     .setDescription('Help Moderators punish consistently')
     .addStringOption(IDSelector),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('blacklist')
     .setDescription('Stop Members from using specific Words or Phrases'),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('blacklist-punishments')
     .setDescription('The Punishments to use in Blacklist')
     .addStringOption(IDSelector),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('expiry')
     .setDescription('Define when logged Punishments expire'),
   ),
 )
 .addSubcommandGroup(
  new Discord.SlashCommandSubcommandGroupBuilder()
   .setName('leveling')
   .setDescription(`Everything about ${name}'s Leveling`)
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('basic')
     .setDescription('Reward Members for their activity with Server Levels'),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('multi-channels')
     .setDescription('Increase or decrease XP rewarded by Channel')
     .addStringOption(IDSelector),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('multi-roles')
     .setDescription('Increase or decrease XP rewarded by Role')
     .addStringOption(IDSelector),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('level-roles')
     .setDescription('Reward Activity with Level-Roles')
     .addStringOption(IDSelector),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('rule-channels')
     .setDescription('Apply conditional XP rewarded by Action in a Channel')
     .addStringOption(IDSelector),
   ),
 )
 .addSubcommandGroup(
  new Discord.SlashCommandSubcommandGroupBuilder()
   .setName('nitro')
   .setDescription(`Everything about ${name}'s Nitro-Rewards`)
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('basic')
     .setDescription('Basic Nitro-Reward Settings'),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('nitro-roles')
     .setDescription(`Reward Members for continuously boosting your Server`)
     .addStringOption(IDSelector),
   ),
 )
 .addSubcommandGroup(
  new Discord.SlashCommandSubcommandGroupBuilder()
   .setName('vote')
   .setDescription('Everything about Voting for your Bot/Server')
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('basic')
     .setDescription(`Basic Settings for Voting on Top.gg`)
     .addStringOption(IDSelector),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('vote-rewards')
     .setDescription(`Reward Members for Voting for your Bot/Server`)
     .addStringOption(IDSelector),
   ),
 )
 .addSubcommandGroup(
  new Discord.SlashCommandSubcommandGroupBuilder()
   .setName('roles')
   .setDescription(`Everything about ${name}'s Role Management`)
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('role-rewards')
     .setDescription('Give Rewards to Members for achieving a Role')
     .addStringOption(IDSelector),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('auto-roles')
     .setDescription('Assign Roles to Users and Bots when joining'),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('self-roles')
     .setDescription('Let Members pick their own Roles')
     .addStringOption(IDSelector),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('separators')
     .setDescription('Separate Roles into Categories using Category Roles / Role Separators')
     .addStringOption(IDSelector),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('sticky')
     .setDescription('Make Roles and Channel Permissions stick to Members across re-joins'),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('reaction-role-settings')
     .setDescription('Let Members pick their own Roles through Reactions')
     .addStringOption(IDSelector),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('reaction-roles')
     .setDescription('Here you define the Reactions and their associated Roles')
     .addStringOption(IDSelector),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('button-role-settings')
     .setDescription('Let Members pick their own Roles through Buttons')
     .addStringOption(IDSelector),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('button-roles')
     .setDescription('Here you define the Buttons and their associated Roles')
     .addStringOption(IDSelector),
   ),
 )

 .addSubcommandGroup(
  new Discord.SlashCommandSubcommandGroupBuilder()
   .setName('automation')
   .setDescription(`Everything about ${name}'s Automation`)
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('delete-commands')
     .setDescription(`Make ${name} delete Commands and/or Replies`)
     .addStringOption(IDSelector),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('cooldowns')
     .setDescription(`Assign custom defined Cooldowns to Commands of ${name}`)
     .addStringOption(IDSelector),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('disboard-reminders')
     .setDescription('Have a Bump reminder remind your Members to bump your Server'),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('logs')
     .setDescription('Log Changes to any Part of your Server'),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('suggestions')
     .setDescription('Let your Members help you decide through a suggestions Channel'),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('verification')
     .setDescription('Make joining Users verify with a Captcha'),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('welcome')
     .setDescription('Greet joining Users with a welcome Message'),
   ),
 )
 .addSubcommand(
  new Discord.SlashCommandSubcommandBuilder()
   .setName('basic')
   .setDescription(`Basic Settings to modify ${name}'s behaviour`),
 );

const info = new Discord.SlashCommandBuilder()
 .setName('info')
 .setDescription('Display Information about anything on Discord')
 .setDMPermission(true)
 .addSubcommand(
  new Discord.SlashCommandSubcommandBuilder()
   .setName('user')
   .setDescription('Display Information about a User')
   .addUserOption(User.setName('user-mention'))
   .addStringOption(SearchUsername),
 )
 .addSubcommand(
  new Discord.SlashCommandSubcommandBuilder()
   .setName('server')
   .setDescription('Display Information about a Server')
   .addStringOption(
    new Discord.SlashCommandStringOption()
     .setDescription('The ID of the Server')
     .setRequired(false)
     .setName('server-id'),
   )
   .addStringOption(
    new Discord.SlashCommandStringOption()
     .setName('server-name')
     .setDescription(`Name of the Server (Searches across all of ${name}'s Servers)`)
     .setRequired(false)
     .setMinLength(1)
     .setAutocomplete(true),
   )
   .addStringOption(
    new Discord.SlashCommandStringOption()
     .setName('server-invite')
     .setDescription('Invite to the Server')
     .setRequired(false)
     .setMinLength(1),
   ),
 )
 .addSubcommand(
  new Discord.SlashCommandSubcommandBuilder()
   .setName('channel')
   .setDescription('Display Information about a Channel')
   .addChannelOption(
    new Discord.SlashCommandChannelOption()
     .setName('channel-mention')
     .setDescription('The Channel you want to get Information about')
     .setRequired(true),
   ),
 )
 .addSubcommand(
  new Discord.SlashCommandSubcommandBuilder()
   .setName('bot')
   .setDescription(`Display Information about a ${name}`),
 )
 .addSubcommand(
  new Discord.SlashCommandSubcommandBuilder()
   .setName('badges')
   .setDescription('Display Information about the Discord Badges Members of this Server have'),
 );

const embedbuilder = new Discord.SlashCommandBuilder()
 .setName('embed-builder')
 .setDescription('Everything around Embeds and custom Embeds')
 .setDMPermission(false)
 .addSubcommandGroup(
  new Discord.SlashCommandSubcommandGroupBuilder()
   .setName('view')
   .setDescription('View raw Embed Code')
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('custom-embeds')
     .setDescription('View raw Embed Code of your previously saved custom Embeds')
     .addStringOption(
      new Discord.SlashCommandStringOption()
       .setName('embed')
       .setDescription('Your saved custom Embeds')
       .setRequired(true)
       .setAutocomplete(true),
     ),
   )
   .addSubcommand(
    new Discord.SlashCommandSubcommandBuilder()
     .setName('from-message')
     .setDescription(`View the raw Embed Code of any Message`)
     .addStringOption(
      new Discord.SlashCommandStringOption()
       .setName('message-link')
       .setDescription('The Message Link of the Embeds you want to display')
       .setRequired(true),
     ),
   ),
 )
 .addSubcommand(
  new Discord.SlashCommandSubcommandBuilder()
   .setName('create')
   .setDescription('Create a new custom Embed'),
 );

const check = new Discord.SlashCommandBuilder()
 .setName('check')
 .setDescription('View all Punishments of a User')
 .setDMPermission(false)
 .addUserOption(User)
 .addStringOption(SearchUsername);

const stickMessage = new Discord.ContextMenuCommandBuilder()
 .setName('Stick Message')
 .setDMPermission(false)
 .setDefaultMemberPermissions(Discord.PermissionsBitField.Flags.ManageMessages)
 .setType(Discord.ApplicationCommandType.Message);

const stp = new Discord.SlashCommandBuilder()
 .setName('stp')
 .setDescription('String Replace Test')
 .setDMPermission(true)
 .addStringOption(
  new Discord.SlashCommandStringOption()
   .setName('string')
   .setDescription('The String to replace')
   .setRequired(true),
 );

const membercount = new Discord.SlashCommandBuilder()
 .setName('membercount')
 .setDescription('Display the Membercount of a Server')
 .setDMPermission(false);

const ping = new Discord.SlashCommandBuilder()
 .setName('ping')
 .setDescription(`Display the ${name}'s Ping`)
 .setDMPermission(true);

export default {
 public: { settings, info, embedbuilder, check, stickMessage, stp, membercount, ping },
};
