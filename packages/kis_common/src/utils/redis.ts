import {
  createClient,
  RedisClientType,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from "@redis/client";

let redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;

export const connectRedisClient = async (host: string, port: string) => {
  const newRedisClient = createClient({
    socket: {
      host: host,
      port: Number(port),
    },
  });

  await newRedisClient
    .connect()
    .then(() => redisClient = newRedisClient)
    .catch(console.error);
}

//
export const getRedisClient = () => {
  return redisClient;
}
