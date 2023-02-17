import type * as Discord from 'discord.js';
import * as ch from '../../../BaseClient/ClientHelper.js';
import type CT from '../../../Typings/CustomTypings';

export default async (oldStage: Discord.StageInstance, stage: Discord.StageInstance) => {
  if (!stage.guild) return;
  if (!stage.channel) return;

  const channels = await ch.getLogChannels('stageevents', stage.guild);
  if (!channels) return;

  const language = await ch.languageSelector(stage.guild.id);
  const lan = language.events.logs.channel;
  const con = ch.constants.events.logs.channel;
  const audit = await ch.getAudit(stage.guild, 84, stage.id);
  const auditUser = audit?.executor ?? undefined;
  const files: Discord.AttachmentPayload[] = [];

  const embed: Discord.APIEmbed = {
    author: {
      name: lan.nameStageUpdate,
      icon_url: con.StageUpdate,
    },
    color: ch.constants.colors.loading,
    description: auditUser
      ? lan.descUpdateStageAudit(
          stage.channel,
          language.channelTypes[stage.channel.type],
          auditUser,
        )
      : lan.descUpdateStage(stage.channel, language.channelTypes[stage.channel.type]),
    fields: [],
  };

  const merge = (before: unknown, after: unknown, type: CT.AcceptedMergingTypes, name: string) =>
    ch.mergeLogging(before, after, type, embed, language, name);

  if (oldStage.guildScheduledEventId !== stage.guildScheduledEventId) {
    merge(
      oldStage.guildScheduledEvent
        ? language.languageFunction.getScheduledEvent(oldStage.guildScheduledEvent)
        : language.none,
      stage.guildScheduledEvent
        ? language.languageFunction.getScheduledEvent(stage.guildScheduledEvent)
        : language.none,
      'string',
      language.ScheduledEvent,
    );
  }
  if (oldStage.topic !== stage.topic) {
    merge(oldStage.topic, stage.topic, 'string', lan.topic);
  }
  if (oldStage.channelId !== stage.channelId) {
    merge(
      oldStage.channel
        ? language.languageFunction.getChannel(
            oldStage.channel,
            language.channelTypes[oldStage.channel.type],
          )
        : language.unknown,
      stage.channel
        ? language.languageFunction.getChannel(
            stage.channel,
            language.channelTypes[stage.channel.type],
          )
        : language.unknown,
      'string',
      language.Channel,
    );
  }

  ch.send({ id: channels, guildId: stage.guild.id }, { embeds: [embed], files }, undefined, 10000);
};
