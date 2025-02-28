import { getEnvConfig } from '@kis/common';
import mysql from 'mysql2/promise';

const envConfig = getEnvConfig();

// Hàm kết nối MySQL
export const createDBConnection = async () => {
  return mysql.createConnection({
    host: envConfig.DB_HOST,
    user: envConfig.DB_USER,
    password: envConfig.DB_PASSWORD,
    database: envConfig.DB_NAME,
    port: Number(envConfig.DB_PORT),
  });
};
