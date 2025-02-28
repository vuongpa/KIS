import { APIGatewayProxyHandler } from "aws-lambda";
import * as yup from "yup";
import { getConnectionOptions, getEnvConfig, loadEnvConfig } from "@kis/common";
import { getAppDataSource } from "@kis/wb-data/dist/app-data-source";
import { ProjectEntity } from "@kis/wb-data/dist/entities";
import jwt from "jsonwebtoken";

const schema = yup.object().shape({
  name: yup.string().required("Project name is required."),
  alias: yup
    .string()
    .required("Alias is required.")
    .matches(/^[a-z0-9-_]+$/, "Alias should be lowercase and hyphen-separated"),
  description: yup.string().optional(),
  startDate: yup.date().optional(),
  endDate: yup.date().optional(),
  thumbnail: yup.string().optional(),
});

export const createProject: APIGatewayProxyHandler = async (event) => {
  loadEnvConfig();
  console.log('Received event:', JSON.stringify(event, null, 2));

  const token = event.headers.Authorization?.split(' ')[1];
  console.log('Extracted token:', token);

  try {
    if (!token) {
      return {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Unauthorized' }),
      };
    }

    const envConfig = getEnvConfig();
    const jwt = require('jsonwebtoken');
    const decodedToken = jwt.verify(token, envConfig.JWT_SECRET);
    const userId = decodedToken.userId;

    const appDataSource = getAppDataSource(getConnectionOptions());
    console.log('Checking if data source is initialized:', appDataSource.isInitialized);

    if (!appDataSource.isInitialized) {
      await appDataSource.initialize();
      console.log('Database connection initialized successfully.');
    }

    const body = JSON.parse(event.body ?? '{}');
    console.log('Parsed request body:', body);

    try {
      await schema.validate(body, { abortEarly: false });
    } catch (error: unknown) {
      if (error instanceof yup.ValidationError) {
        return {
          statusCode: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            error: 'Validation failed',
            details: error.errors,
          }),
        };
      }

      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: 'Unexpected error occurred',
        }),
      };
    }

    const existingProject = await appDataSource.manager.findOne(ProjectEntity, {
      where: { alias: body.alias },
    });

    if (existingProject) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Alias already exists' }),
      };
    }

    const project = new ProjectEntity();
    project.name = body.name;
    project.alias = body.alias;
    project.description = body.description;
    project.owner = userId;
    project.thumbnail = body.thumbnail;
    project.createdAt = new Date();
    project.updatedAt = new Date();

    console.log('New Project Entity:', project);

    await appDataSource.manager.save(project);
    console.log('Project saved successfully with ID:', project.id);

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Project created successfully',
        projectId: project.id,
        alias: project.alias,
      }),
    };
  } catch (error: any) {
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
