import { APIGatewayProxyHandler } from "aws-lambda";
import { getConnectionOptions, getEnvConfig, loadEnvConfig, verifyToken } from "@kis/common";
import { getAppDataSource } from "@kis/wb-data/dist/app-data-source";
import { ProjectEntity } from "@kis/wb-data/dist/entities";
import { JwtPayload } from "jsonwebtoken";

export const deleteProject: APIGatewayProxyHandler = async (event) => {

  try {
    const projectId = event.pathParameters?.projectId;

    if (!projectId) {
      console.log("Thiếu project ID");
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Project ID is required" }),
      };
    }

    const token = (event.headers.Authorization ?? event.headers.authorization)?.split(" ")[1];
    console.log("Token nhận được:", token);

    if (!token) {
      console.log("Không có token");
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Token required" }),
      };
    }

    const decoded = await verifyToken(token, getEnvConfig().JWT_SECRET ?? "") as JwtPayload;

    if (!decoded || !decoded.userId) {
      console.log("Token không hợp lệ");
      return {
        statusCode: 403,
        body: JSON.stringify({ error: "Invalid token" }),
      };
    }

    const appDataSource = getAppDataSource(getConnectionOptions());
    if (!appDataSource.isInitialized) {
      console.log("Khởi tạo data source...");
      await appDataSource.initialize();
      console.log("Kết nối MySQL thành công.");
    }

    const projectRepo = appDataSource.getRepository(ProjectEntity);
    console.log(`Tìm kiếm project ID: ${projectId} của user ID: ${decoded.userId}`);

    const project = await projectRepo.findOne({
      where: {
        id: parseInt(projectId, 10),
        owner: { id: decoded.userId },
      },
    });

    if (!project) {
      console.log("Không tìm thấy project hoặc không có quyền xóa.");
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Project not found or no permission" }),
      };
    }

    await projectRepo.delete({ id: parseInt(projectId, 10) });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Project deleted successfully" }),
    };
  } catch (error: any) {
    console.error("Lỗi khi xóa project:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Không thể xóa project", details: error.message }),
    };
  }
};