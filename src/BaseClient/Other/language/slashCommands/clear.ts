import * as CT from '../../../../Typings/CustomTypings.js';

export default (t: CT.Language) => ({
 ...t.JSON.slashCommands.clear,
 deleted: (amount: number) => t.stp(t.JSON.slashCommands.clear.deleted, { amount }),
});
