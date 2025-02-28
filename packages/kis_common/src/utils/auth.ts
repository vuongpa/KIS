//jwt
import * as jwt from 'jsonwebtoken';
import { connectRedisClient, getRedisClient } from "./redis";
import { getEnvConfig, loadEnvConfig } from './config';
import { getAccessTokenCacheKey } from '../cache_helper';

export type Token = {
  token: string;
}

export const generateTokens = (
  userId: number,
  jwtSecret: string,
  refreshSecret: string,
) => {
  const accessToken = jwt.sign({ userId }, jwtSecret, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId }, refreshSecret, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

export const verifyToken = async (
  token: string,
  jwtSecret: string,
) => {
  loadEnvConfig();
  const envConfig = getEnvConfig();
  await connectRedisClient(
    envConfig.REDIS_HOST ?? '',
    envConfig.REDIS_PORT ?? ''
  );
  const redisClient = getRedisClient();
  const isBlacklisted = await redisClient.get(
    getAccessTokenCacheKey(token)
  );
  if (isBlacklisted) throw new Error("Token revoked");
  return jwt.verify(token, jwtSecret);
};

export const revokeToken = async (token: string) => {
  loadEnvConfig();
  const envConfig = getEnvConfig();
  await connectRedisClient(
    envConfig.REDIS_HOST ?? '',
    envConfig.REDIS_PORT ?? ''
  );
  const redisClient = getRedisClient();
  await redisClient.set(
    getAccessTokenCacheKey(token),
    "blacklisted",
    { EX: 3600 }
  );
};

export const verifyRefreshToken = async (
  refreshToken: string,
  refreshSecret: string,
) => {
  return jwt.verify(refreshToken, refreshSecret);
};
