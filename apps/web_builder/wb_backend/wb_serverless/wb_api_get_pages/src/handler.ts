import { APIGatewayProxyHandler } from "aws-lambda";
import { getConnectionOptions, verifyToken } from "@kis/common";
import { getEnvConfig, loadEnvConfig } from "@kis/common";
import { getAppDataSource } from "@kis/wb-data/dist/app-data-source";
import { ProjectEntity } from "@kis/wb-data/dist/entities";

interface JwtPayload {
  userId: number;
}

export const getPages: APIGatewayProxyHandler = async (event) => {

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
      await appDataSource.initialize();
    }

    const alias = event.pathParameters?.alias;
    if (!alias) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Alias is required" }),
      };
    }
    
    const project = await appDataSource.getRepository(ProjectEntity).findOne({
      where: { alias },
      relations: ['pages'],
    });

    if (!project) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Project not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "List of pages for the project",
        pages: project.pages,
      }),
    };
  } catch (error: any) {
    console.error("Error fetching pages:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Unable to fetch pages",
      }),
    };
  }
};