import moment from 'moment';
import type * as DDeno from 'discordeno';
import client from '../../../BaseClient/DDenoClient.js';
import type CT from '../../../Typings/CustomTypings';
import 'moment-duration-format';

export default async (rule: DDeno.AutoModerationRule, oldRule: DDeno.AutoModerationRule) => {
  if (!rule.guildId) return;

  const channels = await client.ch.getLogChannels('reactionevents', rule);
  if (!channels) return;

  const language = await client.ch.languageSelector(rule.guildId);
  const lan = language.events.logs.automodRule;
  const con = client.customConstants.events.logs.automodRule;
  const user = await client.cache.users.get(rule.creatorId);
  if (!user) return;

  const embed: DDeno.Embed = {
    author: {
      iconUrl: con.delete,
      name: lan.name,
    },
    description: lan.descUpdate(user, rule),
    fields: [],
  };

  const merge = (before: unknown, after: unknown, type: CT.AcceptedMergingTypes, name: string) =>
    client.ch.mergeLogging(before, after, type, embed, language, name);

  switch (true) {
    case rule.name !== oldRule.name: {
      merge(oldRule.name, rule.name, 'string', language.name);
      break;
    }
    case rule.enabled !== oldRule.enabled: {
      merge(oldRule.enabled, rule.enabled, 'boolean', lan.enabled);
      break;
    }
    case rule.eventType !== oldRule.eventType: {
      merge(
        lan.eventType[oldRule.eventType],
        lan.eventType[rule.eventType],

        'string',
        lan.eventType[0],
      );
      break;
    }
    case rule.triggerType !== oldRule.triggerType: {
      merge(
        lan.triggerType[oldRule.triggerType],
        lan.triggerType[rule.triggerType],
        'string',
        lan.triggerType[0],
      );
      break;
    }
    case rule.triggerMetadata?.mentionTotalLimit !== oldRule.triggerMetadata?.mentionTotalLimit: {
      merge(
        oldRule.triggerMetadata?.mentionTotalLimit,
        rule.triggerMetadata?.mentionTotalLimit,
        'string',
        lan.mentionTotalLimit,
      );
      break;
    }
    case JSON.stringify(rule.exemptRoles) !== JSON.stringify(oldRule.exemptRoles): {
      merge(
        client.ch
          .getDifference(rule.exemptRoles, oldRule.exemptRoles)
          .map((r) => `<@&${r}>`)
          .join(', '),
        client.ch
          .getDifference(oldRule.exemptRoles, rule.exemptRoles)
          .map((r) => `<@&${r}>`)
          .join(', '),
        'difference',
        lan.exemptRoles,
      );
      break;
    }
    case JSON.stringify(rule.exemptChannels) !== JSON.stringify(oldRule.exemptChannels): {
      merge(
        client.ch
          .getDifference(rule.exemptChannels, oldRule.exemptChannels)
          .map((r) => `<#${r}>`)
          .join(', '),
        client.ch
          .getDifference(oldRule.exemptChannels, rule.exemptChannels)
          .map((r) => `<#${r}>`)
          .join(', '),
        'difference',
        lan.exemptChannels,
      );
      break;
    }
    case JSON.stringify(rule.triggerMetadata?.keywordFilter) !==
      JSON.stringify(oldRule.triggerMetadata?.keywordFilter): {
      merge(
        client.ch
          .getDifference(
            rule.triggerMetadata?.keywordFilter ?? [],
            oldRule.triggerMetadata?.keywordFilter ?? [],
          )
          .map((r) => `\`${r}\``)
          .join(', '),
        client.ch
          .getDifference(
            oldRule.triggerMetadata?.keywordFilter ?? [],
            rule.triggerMetadata?.keywordFilter ?? [],
          )
          .map((r) => `\`${r}\``)
          .join(', '),
        'difference',
        lan.keywordFilter,
      );
      break;
    }
    case JSON.stringify(rule.triggerMetadata?.presets) !==
      JSON.stringify(oldRule.triggerMetadata?.presets): {
      merge(
        client.ch
          .getDifference(
            (rule.triggerMetadata?.presets ?? []).map((p) => lan.presets[p]),
            (oldRule.triggerMetadata?.presets ?? []).map((p) => lan.presets[p]),
          )
          .map((r) => `\`${r}\``)
          .join(', '),
        client.ch
          .getDifference(
            (rule.triggerMetadata?.presets ?? []).map((p) => lan.presets[p]),
            (oldRule.triggerMetadata?.presets ?? []).map((p) => lan.presets[p]),
          )
          .map((r) => `\`${r}\``)
          .join(', '),
        'difference',
        lan.presets[0],
      );
      break;
    }
    case JSON.stringify(rule.triggerMetadata?.allowList) !==
      JSON.stringify(oldRule.triggerMetadata?.allowList): {
      merge(
        client.ch
          .getDifference(
            rule.triggerMetadata?.allowList ?? [],
            oldRule.triggerMetadata?.allowList ?? [],
          )
          .map((r) => `\`${r}\``)
          .join(', '),
        client.ch
          .getDifference(
            rule.triggerMetadata?.allowList ?? [],
            oldRule.triggerMetadata?.allowList ?? [],
          )
          .map((r) => `\`${r}\``)
          .join(', '),
        'difference',
        lan.allowList,
      );
      break;
    }
    default: {
      if (JSON.stringify(rule.actions) === JSON.stringify(oldRule.actions)) return;

      const oldJsonActions = oldRule.actions.map((a) => JSON.stringify(a));
      const newJsonActions = rule.actions.map((a) => JSON.stringify(a));
      const uniqueActions = [
        ...client.ch.getDifference(newJsonActions, oldJsonActions),
        ...client.ch.getDifference(oldJsonActions, newJsonActions),
      ];
      const addedActions = [...client.ch.getDifference(newJsonActions, oldJsonActions)].filter(
        (a) => !uniqueActions.includes(a),
      );
      const removedActions = [...client.ch.getDifference(oldJsonActions, newJsonActions)].filter(
        (a) => !uniqueActions.includes(a),
      );
      const changedActions = [...addedActions].filter((a) => removedActions.includes(a));
      const added = addedActions.map(
        (a) => JSON.parse(a as string) as DDeno.AutoModerationRule['actions'][0],
      );
      const removed = removedActions.map(
        (a) => JSON.parse(a as string) as DDeno.AutoModerationRule['actions'][0],
      );
      const changed = changedActions.map(
        (a) => JSON.parse(a as string) as DDeno.AutoModerationRule['actions'][0],
      );
      const addedChannels = await Promise.all(
        added.map((a) =>
          a.metadata?.channelId ? client.cache.channels.get(a.metadata?.channelId) : undefined,
        ),
      );
      const removedChannels = await Promise.all(
        removed.map((a) =>
          a.metadata?.channelId ? client.cache.channels.get(a.metadata?.channelId) : undefined,
        ),
      );
      const changedChannels = await Promise.all(
        changed.map((a) =>
          a.metadata?.channelId ? client.cache.channels.get(a.metadata?.channelId) : undefined,
        ),
      );

      const getActionContent = (
        array: DDeno.AutoModerationRule['actions'],
        channel: (DDeno.Channel | undefined)[],
      ) =>
        array
          .map(
            (action, i) =>
              `${lan.actionsType[0]}: \`${lan.actionsType[action.type]}\`${
                action.type !== 1
                  ? `- ${
                      action.type === 2
                        ? `${lan.alertChannel} <#${action.metadata?.channelId}>  / \`${channel[i]?.name}\` / \`${action.metadata?.channelId}\``
                        : `${lan.timeoutDuration} ${moment
                            .duration(action.metadata?.durationSeconds)
                            .format(
                              `y [${language.time.years}], M [${language.time.months}], d [${language.time.days}], h [${language.time.hours}], m [${language.time.minutes}], s [${language.time.seconds}]`,
                              { trim: 'all' },
                            )}`
                    }`
                  : ''
              }`,
          )
          .join('\n');

      const addedContent = getActionContent(added, addedChannels);
      const removedContent = getActionContent(removed, removedChannels);
      const changedContent = getActionContent(changed, changedChannels);

      if (addedContent) {
        embed.fields?.push({ name: language.Added, value: addedContent, inline: false });
      }

      if (removedContent) {
        embed.fields?.push({ name: language.Added, value: removedContent, inline: false });
      }

      if (changedContent) {
        embed.fields?.push({ name: language.Added, value: changedContent, inline: false });
      }
    }
  }

  client.ch.send(
    { id: channels, guildId: rule.guildId },
    { embeds: [embed] },
    language,
    undefined,
    10000,
  );
};
