export type EnvConfig = {
  PORT: string;
  JWT_SECRET: string;
  REFRESH_SECRET: string;
  REDIS_HOST: string;
  REDIS_PORT: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_PORT: string;
};

const DEFAULT_ENV_envConfig = {
  PORT: "3000",
  JWT_SECRET: "default_secret",
  REFRESH_SECRET: "default_refresh_secret",
  REDIS_HOST: "localhost",
  REDIS_PORT: "6379",
  DB_HOST: "localhost",
  DB_USER: "root",
  DB_PASSWORD: "",
  DB_NAME: "test",
  DB_PORT: "3307",
};

let _envConfig: Partial<EnvConfig> = {};

export const loadEnvConfig = () => {
  const requiredEnvVars = [
    "PORT",
    "JWT_SECRET",
    "REFRESH_SECRET",
    "REDIS_HOST",
    "REDIS_PORT",
    "DB_HOST",
    "DB_USER",
    "DB_PASSWORD",
    "DB_NAME",
    "DB_PORT",
  ];
  const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);
  if (missingEnvVars.length > 0) {
    console.warn(`⚠️ Missing environment variables: ${missingEnvVars.join(", ")}`);
  }

  _envConfig = {
    PORT: process.env.PORT ?? DEFAULT_ENV_envConfig.PORT,
    JWT_SECRET: process.env.JWT_SECRET ?? DEFAULT_ENV_envConfig.JWT_SECRET,
    REFRESH_SECRET: process.env.REFRESH_SECRET ?? DEFAULT_ENV_envConfig.REFRESH_SECRET,
    REDIS_HOST: process.env.REDIS_HOST ?? DEFAULT_ENV_envConfig.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT ?? DEFAULT_ENV_envConfig.REDIS_PORT,
    DB_HOST: process.env.DB_HOST ?? DEFAULT_ENV_envConfig.DB_HOST,
    DB_USER: process.env.DB_USER ?? DEFAULT_ENV_envConfig.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD ?? DEFAULT_ENV_envConfig.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME ?? DEFAULT_ENV_envConfig.DB_NAME,
    DB_PORT: process.env.DB_PORT ?? DEFAULT_ENV_envConfig.DB_PORT,
  };

  console.log("✅ Loaded environment variables:");
  console.log(`  - PORT: ${_envConfig.PORT}`);
  console.log(`  - JWT_SECRET: ${_envConfig.JWT_SECRET}`);
  console.log(`  - REFRESH_SECRET: ${_envConfig.REFRESH_SECRET}`);
  console.log(`  - REDIS_HOST: ${_envConfig.REDIS_HOST}`);
  console.log(`  - REDIS_PORT: ${_envConfig.REDIS_PORT}`);
  console.log(`  - DB_HOST: ${_envConfig.DB_HOST}`);
  console.log(`  - DB_USER: ${_envConfig.DB_USER}`);
  console.log(`  - DB_PASSWORD: ${_envConfig.DB_PASSWORD}`);
  console.log(`  - DB_NAME: ${_envConfig.DB_NAME}`);
  console.log(`  - DB_PORT: ${_envConfig.DB_PORT}`);
};

export const getEnvConfig = () => {
  if (Object.keys(_envConfig).length === 0) loadEnvConfig();
  return _envConfig;
};
