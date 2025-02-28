import { APIGatewayProxyHandler } from "aws-lambda";
import { 
    getConnectionOptions, 
    getEnvConfig, 
    loadEnvConfig,
    verifyToken 
    } from "@kis/common";
import { getAppDataSource } from "@kis/wb-data/dist/app-data-source";
import { ProjectEntity } from "@kis/wb-data/dist/entities";
import { JwtPayload } from "jsonwebtoken";
import { Like } from "typeorm";

export const duplicateProject: APIGatewayProxyHandler = async (event) => {
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

        const appDataSource = await ensureDataSourceInitialized();
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

        // Generate a unique alias for the new project copy
        const newAlias = await generateUniqueAlias(projectRepo, project.alias);

        // Prepare the data for the new duplicated project
        const newProjectData = {
            name: `Copy of ${project.name}`,
            alias: newAlias,
            description: project.description,
            thumbnail: project.thumbnail,
            owner: project.owner,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const createProjectResponse = await createProjectInternal(newProjectData, token);

        return {
            statusCode: createProjectResponse.statusCode,
            body: createProjectResponse.body,
        };
    } catch (error: any) {
        console.error("Error duplicating project:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Could not duplicate project" }),
        };
    }
};

const ensureDataSourceInitialized = async () => {
    const appDataSource = getAppDataSource(getConnectionOptions());
    if (!appDataSource.isInitialized) {
        await appDataSource.initialize();
    }
    return appDataSource;
};

const generateUniqueAlias = async (projectRepo: any, baseAlias: string) => {
    const allProjects = await projectRepo.find({
        where: { alias: Like(`${baseAlias}-copy%`) },
    });

    let highestCopy = 0;

    // Find the highest copy number
    allProjects.forEach((project: any) => {
        const match = project.alias.match(/-copy-(\d+)$/);
        if (match) {
            const copyNumber = parseInt(match[1], 10);
            if (copyNumber > highestCopy) {
                highestCopy = copyNumber;
            }
        }
    });

    // Return the next alias with incremented number
    return `${baseAlias}-copy-${highestCopy + 1}`;
};

const createProjectInternal = async (projectData: any, token: string) => {
    const envConfig = getEnvConfig();
    const jwt = require('jsonwebtoken');
    const decodedToken = jwt.verify(token, envConfig.JWT_SECRET);
    const userId = decodedToken.userId;

    try {
        const appDataSource = await ensureDataSourceInitialized();
        const projectRepo = appDataSource.getRepository(ProjectEntity);

        // Check if project alias already exists before saving
        const existingProject = await projectRepo.findOne({
            where: { alias: projectData.alias },
        });
        if (existingProject) {
            throw new Error(`Alias ${projectData.alias} already exists`);
        }

        const project = new ProjectEntity();

        project.name = projectData.name;
        project.alias = projectData.alias;
        project.description = projectData.description;
        project.owner = userId;
        project.thumbnail = projectData.thumbnail;
        project.createdAt = new Date();
        project.updatedAt = new Date();

        await projectRepo.save(project);

        return {
            statusCode: 201,
            body: JSON.stringify({
                message: 'Project duplicated successfully',
                projectId: project.id,
                alias: project.alias,
            }),
        };
    } catch (error: any) {
        console.error("Error creating project:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Could not create duplicated project" }),
        };
    }
};