import { Context, APIGatewayProxyEvent } from 'aws-lambda';
import { verifyToken } from "@kis/common/src/utils/auth";
import { getEnvConfig, loadEnvConfig } from "@kis/common";

loadEnvConfig();

export const run = async (event: APIGatewayProxyEvent, context: Context) => {
  try {
    const token = (event.headers.Authorization ?? event.headers.authorization)?.split(" ")[1];
    if (!token) {
      return {
        statusCode: 400,
        error: "Token required"
      };
    }

    const decoded = await verifyToken(
      token,
      getEnvConfig().JWT_SECRET ?? ''
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        valid: true,
        decoded
      }),
    };
  } catch (err) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        error: "Invalid token"
      }),
    }
  }
};
