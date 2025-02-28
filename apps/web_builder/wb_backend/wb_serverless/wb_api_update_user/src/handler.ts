import { APIGatewayProxyHandler } from "aws-lambda";
import { getConnectionOptions, verifyToken } from "@kis/common";
import { getEnvConfig, loadEnvConfig } from "@kis/common";
import { getAppDataSource } from "@kis/wb-data/dist/app-data-source";
import { UserEntity } from "@kis/wb-data/dist/entities";
import bcrypt from "bcryptjs";

interface JwtPayload {
  userId: number;
}

export const updateUser: APIGatewayProxyHandler = async (event) => {
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

    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Request body is missing" }),
      };
    }

    const { oldPassword, newPassword, confirmNewPassword } = JSON.parse(event.body);

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "All fields are required (oldPassword, newPassword, confirmNewPassword)" }),
      };
    }

    if (newPassword !== confirmNewPassword) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "New passwords do not match" }),
      };
    }

    const appDataSource = getAppDataSource(getConnectionOptions());
    if (!appDataSource.isInitialized) {
      console.log("Initializing data source...");
      await appDataSource.initialize();
      console.log("Connected to MySQL successfully.");
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

    const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isMatch) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Old password is incorrect" }),
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password_hash = hashedPassword;
    await appDataSource.manager.save(user);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Password updated successfully" }),
    };
  } catch (error: any) {
    console.error("Error updating password:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Could not update password",
      }),
    };
  }
};
