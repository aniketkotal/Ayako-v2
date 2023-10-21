import * as Discord from 'discord.js';
import { ShopType } from '@prisma/client';
import * as ch from '../../../../BaseClient/ClientHelper.js';
import * as CT from '../../../../Typings/CustomTypings.js';
import { TableNamesPrismaTranslation } from '../../../../BaseClient/Other/constants.js';

const name = 'shop-items';

export default async (cmd: Discord.ChatInputCommandInteraction) => {
 if (!cmd.inCachedGuild()) return;

 const language = await ch.getLanguage(cmd.guild?.id);
 const lan = language.slashCommands.settings.categories[name];

 const ID = cmd.options.get('id', false)?.value as string;
 if (ID) {
  showID(cmd, ID, language, lan);
  return;
 }
 showAll(cmd, language, lan);
};

export const showID: NonNullable<CT.SettingsFile<typeof name>['showID']> = async (
 cmd,
 ID,
 language,
 lan,
) => {
 const { buttonParsers, embedParsers } = ch.settingsHelpers;
 const settings = await ch.DataBase[TableNamesPrismaTranslation[name]]
  .findUnique({
   where: { uniquetimestamp: parseInt(ID, 36) },
  })
  .then(
   (r) =>
    r ??
    (ch.settingsHelpers.setup(
     name,
     cmd.guildId,
     ID ? parseInt(ID, 36) : Date.now(),
    ) as unknown as CT.TableNamesMap[typeof name]),
  );

 if (cmd.isButton()) {
  cmd.update({
   embeds: await getEmbeds(embedParsers, settings, language, lan, cmd.guild),
   components: await getComponents(buttonParsers, settings, language),
  });
  return;
 }

 cmd.reply({
  embeds: await getEmbeds(embedParsers, settings, language, lan, cmd.guild),
  components: await getComponents(buttonParsers, settings, language),
  ephemeral: true,
 });
};

export const showAll: NonNullable<CT.SettingsFile<typeof name>['showAll']> = async (
 cmd,
 language,
 lan,
) => {
 const { embedParsers, multiRowHelpers } = ch.settingsHelpers;
 const settings = await ch.DataBase[TableNamesPrismaTranslation[name]].findMany({
  where: { guildid: cmd.guildId },
 });

 const fields = settings?.map((s) => ({
  name: `ID: \`${Number(s.uniquetimestamp).toString(36)}\` - ${
   lan.fields.price.name
  }: \`${embedParsers.number(Number(s.price), language)}\``,
  value: `${
   s.active
    ? ch.constants.standard.getEmote(ch.emotes.enabled)
    : ch.constants.standard.getEmote(ch.emotes.disabled)
  } - ${lan.fields.roles.name}: ${
   s.roles
    .slice(0, 5)
    .map((r) => `<@&${r}>`)
    .join(', ') ?? language.None
  }`,
 }));

 const embeds = multiRowHelpers.embeds(fields, language, lan);
 const components = multiRowHelpers.options(language, name);
 multiRowHelpers.noFields(embeds, language);
 multiRowHelpers.components(embeds, components, language, name);

 if (cmd.isButton()) {
  cmd.update({
   embeds,
   components,
  });
  return;
 }
 cmd.reply({
  embeds,
  components,
  ephemeral: true,
 });
};

export const getEmbeds: CT.SettingsFile<typeof name>['getEmbeds'] = async (
 embedParsers,
 settings,
 language,
 lan,
) => [
 {
  footer: { text: `ID: ${Number(settings.uniquetimestamp).toString(36)}` },
  description: ch.constants.tutorials[name as keyof typeof ch.constants.tutorials]?.length
   ? `${language.slashCommands.settings.tutorial}\n${ch.constants.tutorials[
      name as keyof typeof ch.constants.tutorials
     ].map((t) => `[${t.name}](${t.link})`)}`
   : undefined,
  author: embedParsers.author(language, lan),
  fields: [
   {
    name: language.slashCommands.settings.active,
    value: embedParsers.boolean(settings?.active, language),
    inline: false,
   },
   {
    name: lan.fields.roles.name,
    value: embedParsers.roles(settings?.roles, language),
    inline: false,
   },
   {
    name: lan.fields.price.name,
    value: settings?.price ? embedParsers.number(Number(settings.price), language) : language.None,
    inline: true,
   },
   {
    name: lan.fields.shoptype.name,
    value: await getShopType(settings.guildid, settings.shoptype, lan),
    inline: true,
   },
   ...(settings.shoptype === 'message'
    ? [
       {
        name: lan.fields.msgid.name,
        value:
         settings.guildid && settings.channelid && settings.msgid
          ? ch.constants.standard.msgurl(settings.guildid, settings.channelid, settings.msgid)
          : language.None,
        inline: true,
       },
       {
        name: lan.fields.buttonemote.name,
        value: settings.buttonemote
         ? ch.constants.standard.getEmote(
            Discord.parseEmoji(settings.buttonemote) ?? ch.emotes.book,
           )
         : language.None,
        inline: true,
       },
       {
        name: lan.fields.buttontext.name,
        value: embedParsers.string(settings.buttontext, language),
        inline: true,
       },
      ]
    : []),
  ],
 },
];

const getShopType = async (
 guildId: string,
 type: ShopType,
 lan: CT.Language['slashCommands']['settings']['categories'][typeof name],
) => {
 switch (type) {
  case 'message': {
   return lan.message;
  }
  default: {
   return lan.command((await ch.getCustomCommand(guildId, 'shop'))?.id ?? '0');
  }
 }
};

export const getComponents: CT.SettingsFile<typeof name>['getComponents'] = (
 buttonParsers,
 settings,
 language,
) => [
 {
  type: Discord.ComponentType.ActionRow,
  components: [
   buttonParsers.back(name, undefined),
   buttonParsers.global(
    language,
    !!settings?.active,
    'active',
    name,
    Number(settings?.uniquetimestamp),
   ),
   buttonParsers.delete(language, name, Number(settings?.uniquetimestamp)),
  ],
 },
 {
  type: Discord.ComponentType.ActionRow,
  components: [
   buttonParsers.specific(
    language,
    settings?.roles,
    'roles',
    name,
    Number(settings?.uniquetimestamp),
   ),
   buttonParsers.specific(
    language,
    settings?.price,
    'price',
    name,
    Number(settings?.uniquetimestamp),
   ),
   buttonParsers.specific(
    language,
    settings?.shoptype,
    'shoptype',
    name,
    Number(settings?.uniquetimestamp),
   ),
  ],
 },
 ...(settings?.shoptype === 'message'
  ? ([
     {
      type: Discord.ComponentType.ActionRow,
      components: [
       buttonParsers.specific(
        language,
        settings?.msgid,
        'msgid',
        name,
        Number(settings?.uniquetimestamp),
       ),
       buttonParsers.specific(
        language,
        settings?.buttonemote,
        'buttonemote',
        name,
        Number(settings?.uniquetimestamp),
       ),
       buttonParsers.specific(
        language,
        settings?.buttontext,
        'buttontext',
        name,
        Number(settings?.uniquetimestamp),
       ),
      ],
     },
    ] as Discord.APIActionRowComponent<Discord.APIButtonComponent>[])
  : []),
];

export const postChange: CT.SettingsFile<typeof name>['postChange'] = async (
 _oldSettings,
 newSettings,
 changedSetting,
 guild,
 uniquetimestamp,
) => {
 if (!newSettings) return;

 switch (changedSetting) {
  case 'active': {
   const settings = await ch.DataBase.shopitems.findUnique({
    where: { uniquetimestamp },
   });
   if (!settings) return;

   const message = await ch.getMessage(
    ch.constants.standard.msgurl(settings.guildid, settings.channelid ?? '', settings.msgid ?? ''),
   );
   if (!message) return;

   const componentChunks: Discord.APIButtonComponentWithCustomId[][] = ch.getChunks(
    [
     ...message.components
      .map((c) =>
       c.components.map((c2) => structuredClone(c2.data) as Discord.APIButtonComponentWithCustomId),
      )
      .flat()
      .filter((c) => c.type === Discord.ComponentType.Button),
     {
      label: settings.buttontext,
      emoji: settings.buttonemote ? Discord.parseEmoji(settings.buttonemote) : undefined,
      custom_id: `shop/buy_${settings.uniquetimestamp}`,
      style: Discord.ButtonStyle.Secondary,
      type: Discord.ComponentType.Button,
     } as Discord.APIButtonComponentWithCustomId,
    ].filter((c) => c.label || c.emoji) as Discord.APIButtonComponentWithCustomId[],
    5,
   );

   switch (newSettings.active) {
    case true: {
     if (message?.author.id === guild.client.user.id) {
      message.edit({
       components: componentChunks.map((c) => ({
        type: Discord.ComponentType.ActionRow,
        components: c,
       })),
      });
     } else {
      ch.request.channels.editMessage(guild, message.channelId, message.id, {
       components: componentChunks.map((c) => ({
        type: Discord.ComponentType.ActionRow,
        components: c,
       })),
      });
     }

     break;
    }
    case false: {
     if (!message) return;
     if (!message.components.length) return;

     if (message?.author.id === guild.client.user.id) {
      message.edit({
       components: componentChunks
        .map((c) => c.filter((c2) => !c2.custom_id.endsWith(String(settings.uniquetimestamp))))
        .map((c) => ({
         type: Discord.ComponentType.ActionRow,
         components: c,
        })),
      });
     } else {
      ch.request.channels.editMessage(guild, message.channelId, message.id, {
       components: componentChunks
        .map((c) => c.filter((c2) => !c2.custom_id.endsWith(String(settings.uniquetimestamp))))
        .map((c) => ({
         type: Discord.ComponentType.ActionRow,
         components: c,
        })),
      });
     }
     break;
    }
    default: {
     break;
    }
   }
   break;
  }
  case 'msgid': {
   const settings = await ch.DataBase.shopitems.findUnique({
    where: { uniquetimestamp },
   });
   if (!settings) return;

   const message = await ch.getMessage(
    ch.constants.standard.msgurl(settings.guildid, settings.channelid ?? '', settings.msgid ?? ''),
   );

   if (!message) return;
   if (message.author.id === guild.client.user.id) return;
   if (message.author.id === (await ch.getBotIdFromGuild(guild))) return;

   ch.error(guild, new Error("button-roles: Message has to be sent by me, else I can't edit it"));
   break;
  }
  default: {
   break;
  }
 }
};
