import type * as Discord from 'discord.js';
import reply from './replyCmd.js';
import objectEmotes from '../Other/ObjectEmotes.json' assert { type: 'json' };
import constants from '../Other/Constants.js';
import type CT from '../../Typings/CustomTypings';

export default (
  msg: Discord.Interaction,
  content: string,
  language: CT.Language,
  type: Discord.InteractionResponseType,
  m?: Discord.Message,
) => {
  const embed: Discord.APIEmbed = {
    author: {
      name: language.error,
      icon_url: objectEmotes.warning.link,
      url: constants.standard.invite,
    },
    color: constants.colors.warning,
    description: content,
  };

  if (m) return m.edit({ embeds: [embed] }).catch(() => null);

  return reply(msg, { data: { embeds: [embed] }, type });
};
