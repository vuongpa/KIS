import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ActionLogEntity, PageEntity, ProjectEntity, UserEntity,LayoutEntity } from './entities';

// Cấu hình kết nối MySQL
let appDataSource: DataSource;

export const getAppDataSource = (options: Partial<{
  host: string,
  port: number,
  username: string,
  password: string,
  database: string,
}>) => {
  if (!appDataSource) {
    appDataSource = new DataSource({
      type: 'mysql',
      host: options.host ?? '127.0.0.1',
      port: options.port ?? 3306,
      username: options.username,
      password: options.password,
      database: options.database,
      synchronize: true,
      logging: true,
      entities: [UserEntity, ActionLogEntity, PageEntity, ProjectEntity,LayoutEntity],
    });
  }
  return appDataSource;
}

export const checkDatabaseConnection = async () => {
  try {
    await appDataSource.initialize();
    console.log('Kết nối đến cơ sở dữ liệu thành công!');
  } catch (error) {
    console.error('Lỗi kết nối cơ sở dữ liệu:', error);
    throw error;
  }
};
