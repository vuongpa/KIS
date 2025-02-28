import { APIGatewayProxyHandler } from "aws-lambda";
import { getConnectionOptions, getEnvConfig, loadEnvConfig, verifyToken } from "@kis/common";
import { getAppDataSource } from "@kis/wb-data/dist/app-data-source";
import { PageEntity } from "@kis/wb-data/dist/entities";
import { ProjectEntity } from "@kis/wb-data/dist/entities";
import { JwtPayload } from "jsonwebtoken";

export const deletePage: APIGatewayProxyHandler = async (event) => {
  loadEnvConfig();

  try {
    const pathParameters = event.pathParameters;
    if (!pathParameters || !pathParameters.alias || !pathParameters.urlAlias) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Project alias and URL alias are required" }),
      };
    }

    const { alias, urlAlias } = pathParameters;

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

    // Fetch project by alias
    const projectRepo = appDataSource.getRepository(ProjectEntity);
    const project = await projectRepo.findOne({
      where: { alias },
    });

    if (!project) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: "Project not found",
          alias,
        }),
      };
    }

    // Fetch page by URL alias and project
    const pageRepo = appDataSource.getRepository(PageEntity);
    const page = await pageRepo.findOne({
      where: {
        urlAlias,
        project: { id: project.id },
      },
    });

    if (!page) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: "Page not found",
          urlAlias,
        }),
      };
    }

    // Delete the page
    await pageRepo.remove(page);

    console.log("Deleted page:", page);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Page deleted successfully",
        page,
      }),
    };
  } catch (error: any) {
    console.error("Error deleting page:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not delete page" }),
    };
  }
};