import { APIGatewayProxyHandler } from "aws-lambda";
import { getConnectionOptions, verifyToken } from "@kis/common"; // Import verifyToken
import { getEnvConfig, loadEnvConfig } from "@kis/common";
import { getAppDataSource } from "@kis/wb-data/dist/app-data-source";
import { ProjectEntity } from "@kis/wb-data/dist/entities";
import { Like } from "typeorm"; // Import Like từ TypeORM

interface JwtPayload {
  userId: number;
}

export const projects: APIGatewayProxyHandler = async (event) => {
  loadEnvConfig();
  const queryParams = event.queryStringParameters ?? {};
  
  const page = parseInt(queryParams.page ?? "1", 10);
  const limit = parseInt(queryParams.limit ?? "10", 10);
  const offset = (page - 1) * limit;
  const projectName = queryParams.name ?? ""; // Tên dự án để tìm kiếm
  const sortBy = queryParams.sortBy ?? "createdAt";
  const sortOrder = "DESC";

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

    const whereCondition = projectName
      ? {
          owner: { id: decoded.userId },
          name: Like(`%${projectName}%`), // Tìm kiếm theo tên dự án
        }
      : { owner: { id: decoded.userId } };

    const [projects, total] = await appDataSource.manager.findAndCount(ProjectEntity, {
      where: whereCondition,
      take: limit,
      skip: offset,
      order: { [sortBy]: sortOrder },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        totalPages: Math.ceil(total / limit),
        projects: projects,
        count_item_projects: total,
        message: "Danh sách dự án của người dùng",
      }),
    };
  } catch (error: any) {
    console.error("Error fetching projects:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Không thể lấy danh sách project",
      }),
    };
  }
};
