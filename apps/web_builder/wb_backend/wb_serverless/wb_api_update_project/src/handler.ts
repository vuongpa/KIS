import { APIGatewayProxyHandler } from "aws-lambda";
import * as yup from "yup";
import { getConnectionOptions, getEnvConfig, loadEnvConfig, verifyToken } from "@kis/common";
import { getAppDataSource } from "@kis/wb-data/dist/app-data-source";
import { ProjectEntity } from "@kis/wb-data/dist/entities";
import jwt, { JwtPayload } from "jsonwebtoken";

const schema = yup.object().shape({
  name: yup.string().optional(),
  alias: yup
    .string()
    .optional()
    .matches(/^[a-z0-9-_]+$/, "Alias should be lowercase and hyphen-separated"),
  description: yup.string().optional(),
  startDate: yup.date().optional(),
  endDate: yup.date().optional(),
  thumbnail: yup.string().optional(),
});

export const updateProject: APIGatewayProxyHandler = async (event) => {
  loadEnvConfig();

  try {
    const projectId = event.pathParameters?.projectId;

    if (!projectId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Project ID is required" }),
      };
    }

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

    const body = JSON.parse(event.body || "{}");

    try {
      await schema.validate(body, { abortEarly: false });
    } catch (validationError: unknown) {
      if (validationError instanceof yup.ValidationError) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            error: "Validation failed",
            details: validationError.errors,
          }),
        };
      }
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Unexpected error occurred",
        }),
      };
    }

    const appDataSource = getAppDataSource(getConnectionOptions());
    if (!appDataSource.isInitialized) {
      console.log("Initializing data source...");
      await appDataSource.initialize();
      console.log("Connected to MySQL successfully.");
    }

    const projectRepo = appDataSource.getRepository(ProjectEntity);
    const project = await projectRepo.findOne({
      where: {
        id: parseInt(projectId, 10),
        owner: { id: decoded.userId },
      },
    });

    if (!project) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: "Project not found",
          projectId: projectId,
        }),
      };
    }

    if (body.alias) {
      const existingAlias = await projectRepo.findOne({
        where: { alias: body.alias },
      });

      if (existingAlias && existingAlias.id !== project.id) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            error: "Alias already exists. Please choose a different alias.",
          }),
        };
      }
    }

    Object.keys(body).forEach((key) => {
      if (body[key] !== undefined) {
        (project as any)[key] = body[key];
      }
    });

    await projectRepo.save(project);

    console.log("Updated project:", project);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Project updated successfully",
        project,
      }),
    };
  } catch (error: any) {
    console.error("Error updating project:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not update project" }),
    };
  }
};

