import { getEnvConfig } from '@kis/common/src/utils/config';
import { generateTokens } from '@kis/common/src/utils/auth';
import { getAppDataSource } from '@kis/wb-data/dist/app-data-source';
import { UserEntity } from '@kis/wb-data/dist/entities';
import bcrypt from 'bcryptjs';
import { getConnectionOptions } from '@kis/common';

export const login = async (req: any, res: any) => {
  const { username, password } = req.body;

  try {
    const appDataSource = getAppDataSource(
      getConnectionOptions()
    );
    if (!appDataSource.isInitialized) {
      await appDataSource.initialize();
    }

    const user = await appDataSource.getRepository(UserEntity).findOne({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ error: 'Username or password is invalid!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Username or password is invalid!' });
    }

    const envConfig = getEnvConfig();

    const { accessToken, refreshToken } = generateTokens(
      user.id,
      envConfig.JWT_SECRET ?? '',
      envConfig.REFRESH_SECRET ?? ''
    );

    return res.json({
      accessToken,
      refreshToken,
      userId: user.id,
      username: user.username,
    });
  } catch (error: any) {
    console.error('Lỗi:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
