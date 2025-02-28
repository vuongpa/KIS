import { APIGatewayProxyHandler } from "aws-lambda";
import { getConnectionOptions, verifyToken } from "@kis/common";
import { getEnvConfig, loadEnvConfig } from "@kis/common";
import { getAppDataSource } from "@kis/wb-data/dist/app-data-source";
import { UserEntity } from "@kis/wb-data/dist/entities";

interface JwtPayload {
  userId: number;
}

export const getUser: APIGatewayProxyHandler = async (event) => {
  loadEnvConfig();

  try {
    const token = (event.headers.Authorization ?? event.headers.authorization)?.split(" ")[1];
    if (!token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Token required" }),
      };
    }

    const decoded = await verifyToken(token, getEnvConfig().JWT_SECRET ?? "") as JwtPayload;

    if (!decoded || !decoded.userId) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: "Invalid token" }),
      };
    }

    const appDataSource = getAppDataSource(getConnectionOptions());

    if (!appDataSource.isInitialized) {
      console.log("Initializing data source...");
      await appDataSource.initialize();
      console.log("Connected to MySQL successfully.");
    }

    const userId = event.pathParameters?.userId;
    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "User ID is required" }),
      };
    }

    const userIdNumber = Number(userId);
    if (isNaN(userIdNumber)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid User ID" }),
      };
    }

    const user = await appDataSource.manager.findOne(UserEntity, {
      where: { id: userIdNumber },
    });

    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "User not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        id: user.id,
        username: user.username,
        message: "User details retrieved successfully",
      }),
    };
  } catch (error: any) {
    console.error("Error fetching user:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Could not retrieve user information",
      }),
    };
  }
};
