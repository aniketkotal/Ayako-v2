import * as CT from '../../../Typings/CustomTypings.js';

export default (t: CT.Language) => ({
 voiceHub: t.stp(t.JSON.autotype.voiceHub, { t }),
 verification: t.stp(t.JSON.autotype.verification, { t }),
 shop: t.stp(t.JSON.autotype.shop, { t }),
 disboard: t.stp(t.JSON.autotype.disboard, { t }),
 afk: t.stp(t.JSON.autotype.afk, { t }),
 leveling: t.stp(t.JSON.autotype.leveling, { t }),
 cooldown: t.stp(t.JSON.autotype.cooldown, { t }),
 antispam: t.stp(t.JSON.autotype.antispam, { t }),
 antivirus: t.stp(t.JSON.autotype.antivirus, { t }),
 deleteBlacklist: t.stp(t.JSON.autotype.deleteBlacklist, { t }),
 blacklist: t.stp(t.JSON.autotype.blacklist, { t }),
 statschannel: t.stp(t.JSON.autotype.statschannel, { t }),
 separators: t.stp(t.JSON.autotype.separators, { t }),
 autopunish: t.stp(t.JSON.autotype.autopunish, { t }),
 selfroles: t.stp(t.JSON.autotype.selfroles, { t }),
 nitro: t.stp(t.JSON.autotype.nitro, { t }),
 autoroles: t.stp(t.JSON.autotype.autoroles, { t }),
 stickyroles: t.stp(t.JSON.autotype.stickyroles, { t }),
 stickyperms: t.stp(t.JSON.autotype.stickyperms, { t }),
 reactionroles: t.stp(t.JSON.autotype.reactionroles, { t }),
 buttonroles: t.stp(t.JSON.autotype.buttonroles, { t }),
});
