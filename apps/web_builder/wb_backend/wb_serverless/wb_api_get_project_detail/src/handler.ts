import { APIGatewayProxyHandler } from "aws-lambda";
import { getConnectionOptions, verifyToken } from "@kis/common";
import { getEnvConfig, loadEnvConfig } from "@kis/common";
import { getAppDataSource } from "@kis/wb-data/dist/app-data-source";
import { ProjectEntity } from "@kis/wb-data/dist/entities";

interface JwtPayload {
  userId: number;
}

export const getProjectDetails: APIGatewayProxyHandler = async (event) => {
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

    const projectId = event.pathParameters?.projectId;
    if (!projectId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Project ID is required" }),
      };
    }

    const appDataSource = getAppDataSource(getConnectionOptions());

    if (!appDataSource.isInitialized) {
      console.log("Initializing data source...");
      await appDataSource.initialize();
      console.log("Connected to MySQL successfully.");
    }

    const project = await appDataSource.getRepository(ProjectEntity).findOne({
      where: {
        id: parseInt(projectId, 10),
        owner: { id: decoded.userId },
      },
    });

    if (!project) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Project not found" }),
      };
    }

    console.log("Fetched project:", project);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Chi tiết dự án",
        project: project,
      }),
    };
  } catch (error: any) {
    console.error("Error fetching project detail:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Không thể lấy thông tin dự án",
      }),
    };
  }
};
