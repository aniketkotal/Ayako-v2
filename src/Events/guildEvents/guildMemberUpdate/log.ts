import type * as Discord from 'discord.js';
import client from '../../../BaseClient/Client.js';
import type CT from '../../../Typings/CustomTypings';

export default async (oldMember: Discord.GuildMember, member: Discord.GuildMember) => {
  const channels = await client.ch.getLogChannels('memberevents', member.guild);
  if (!channels) return;

  const language = await client.ch.languageSelector(member.guild.id);
  const lan = language.events.logs.guild;
  const con = client.customConstants.events.logs.guild;
  const audit = member.user.bot
    ? await client.ch.getAudit(member.guild, 20, member.user.id)
    : undefined;
  const auditUser = audit?.executor ?? undefined;
  let description = '';

  if (member.user.bot) {
    if (audit && auditUser) description = lan.descBotUpdateAudit(member.user, auditUser);
    else description = lan.descBotUpdate(member.user);
  } else if (audit && auditUser) description = lan.descMemberUpdateAudit(member.user, auditUser);
  else description = lan.descMemberUpdate(member.user);

  const embed: Discord.APIEmbed = {
    author: {
      icon_url: member.user.bot ? con.BotUpdate : con.MemberUpdate,
      name: member.user.bot ? lan.botUpdate : lan.memberUpdate,
    },
    description,
    fields: [],
    color: client.customConstants.colors.loading,
  };

  const files: Discord.AttachmentPayload[] = [];
  const merge = (before: unknown, after: unknown, type: CT.AcceptedMergingTypes, name: string) =>
    client.ch.mergeLogging(before, after, type, embed, language, name);

  if (member.avatar !== oldMember.avatar) {
    const attachment = (
      await client.ch.fileURL2Buffer([member.displayAvatarURL({ size: 4096 })])
    )?.[0]?.attachment;

    merge(
      member.displayAvatarURL({ size: 4096 }),
      client.ch.getNameAndFileType(member.displayAvatarURL({ size: 4096 })),
      'icon',
      lan.avatar,
    );

    if (attachment) {
      files.push({
        name: client.ch.getNameAndFileType(member.displayAvatarURL({ size: 4096 })),
        attachment,
      });
    }
  }
  if (member.nickname !== oldMember.nickname) {
    merge(member.nickname, oldMember.nickname, 'string', language.name);
  }
  if (member.premiumSinceTimestamp !== oldMember.premiumSinceTimestamp) {
    merge(
      member.premiumSince
        ? client.customConstants.standard.getTime(member.premiumSince.getTime())
        : language.none,
      oldMember.premiumSince
        ? client.customConstants.standard.getTime(oldMember.premiumSince.getTime())
        : language.none,
      'string',
      lan.premiumSince,
    );
  }
  if (
    member.communicationDisabledUntilTimestamp !== oldMember.communicationDisabledUntilTimestamp
  ) {
    merge(
      member.communicationDisabledUntil
        ? client.customConstants.standard.getTime(member.communicationDisabledUntil.getTime())
        : language.none,
      oldMember.communicationDisabledUntil
        ? client.customConstants.standard.getTime(oldMember.communicationDisabledUntil.getTime())
        : language.none,
      'string',
      lan.communicationDisabledUntil,
    );
  }
  if (JSON.stringify(member.roles) !== JSON.stringify(oldMember.roles)) {
    const addedRoles = client.ch.getDifference(
      member.roles.cache.map((r) => r),
      oldMember.roles.cache.map((r) => r),
    );
    const removedRoles = client.ch.getDifference(
      oldMember.roles.cache.map((r) => r),
      member.roles.cache.map((r) => r),
    );

    merge(
      addedRoles.length ? addedRoles.map((r) => `<@&${r.id}>`).join(', ') : undefined,
      removedRoles.length ? removedRoles.map((r) => `<@&${r.id}>`).join(', ') : undefined,
      'difference',
      language.roles,
    );
  }
  if (member.pending !== oldMember.pending) {
    merge(member.pending, oldMember.pending, 'boolean', lan.deaf);
  }

  client.ch.send(
    { id: channels, guildId: member.guild.id },
    { embeds: [embed], files },
    language,
    undefined,
    10000,
  );
};
