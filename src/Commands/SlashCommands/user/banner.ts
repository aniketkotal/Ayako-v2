import * as Discord from 'discord.js';
import * as ch from '../../../BaseClient/ClientHelper.js';

export default async (cmd: Discord.ChatInputCommandInteraction) => {
 const rawUser = cmd.options.getUser('user', false) || cmd.user;

 const language = await ch.languageSelector(cmd.guildId);
 const user = await rawUser.fetch(true);

 ch.replyCmd(cmd, {
  embeds: [
   {
    author: {
     name: user.tag,
    },
    image: user.banner
     ? {
        url: user.bannerURL({ size: 4096 }) as string,
       }
     : undefined,
    description: user.banner ? undefined : language.None,
    color: ch.colorSelector(cmd.guild?.members.me),
   },
  ],
 });
};
