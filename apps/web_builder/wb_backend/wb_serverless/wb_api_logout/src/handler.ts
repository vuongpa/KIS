import { Context, APIGatewayProxyEvent } from 'aws-lambda';

import { revokeToken } from "@kis/common/src/utils/auth";
import { loadEnvConfig } from "@kis/common";

loadEnvConfig();

export const logout = async (event: APIGatewayProxyEvent, context: Context) => {
  const token = (event.headers.Authorization ?? event.headers.authorization)?.split(" ")[1];
  if (!token) {
    return {
      statusCode: 400,
      error: "Token required"
    };
  }

  await revokeToken(token);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Logged out successfully"
    }),
  };
};
