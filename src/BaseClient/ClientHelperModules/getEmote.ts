/**
 * Returns an emoji
 * @param idPair guildID:stringID
 */
export default async (idPair: string) => {
  const client = (await import('../Client.js')).default;

  const response = await client.shard?.broadcastEval((c, { id }) => c.emojis.cache.get(id), {
    context: { id: idPair.split(':')[1] },
  });

  return response?.find((e) => !!e);
};
