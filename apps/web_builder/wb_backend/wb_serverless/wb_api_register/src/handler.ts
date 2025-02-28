import { APIGatewayProxyHandler } from 'aws-lambda';
import * as yup from 'yup';
import { getConnectionOptions, loadEnvConfig } from '@kis/common';
import { getAppDataSource } from '@kis/wb-data/dist/app-data-source';
import { UserEntity } from '@kis/wb-data/dist/entities';
import bcrypt from 'bcryptjs';

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(6).required(),
});

export const register: APIGatewayProxyHandler = async (event) => {
  loadEnvConfig();
  const body = JSON.parse(event.body ?? '{}');

  try {
    await schema.validate(body);

    const appDataSource = getAppDataSource(
      getConnectionOptions()
    );

    if (!appDataSource.isInitialized) {
      await appDataSource.initialize();
    }

    const existingUser = await appDataSource.manager.findOne(UserEntity, {
      where: { username: body.username }
    });

    if (existingUser) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Username already exists. Please choose another.' }),
      };
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(body.password, salt);

    const user = new UserEntity();
    user.username = body.username;
    user.password_hash = passwordHash;

    await appDataSource.manager.save(user);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'User registered successfully', userId: user.id }),
    };
  } catch (error: any) {
    console.error('Error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
