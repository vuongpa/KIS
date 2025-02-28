import { APIGatewayProxyHandler } from "aws-lambda";
import * as yup from "yup";
import { getConnectionOptions, getEnvConfig, loadEnvConfig } from "@kis/common";
import { getAppDataSource } from "@kis/wb-data/dist/app-data-source";
import { PageEntity } from "@kis/wb-data/dist/entities";
import { ProjectEntity } from "@kis/wb-data/dist/entities";

const schema = yup.object().shape({
  urlAlias: yup
    .string()
    .required("URL alias is required.")
    .matches(/^[a-z0-9-_]+$/, "Alias should be lowercase and hyphen-separated"),
  title: yup.string().optional(),
  metaTags: yup.string().optional(),
  sections: yup.array().optional(),
});

export const createPage: APIGatewayProxyHandler = async (event) => {
  loadEnvConfig();

  const token = event.headers.Authorization?.split(' ')[1];

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

    if (!appDataSource.isInitialized) {
      await appDataSource.initialize();
    }

    const body = JSON.parse(event.body ?? '{}');

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

    // Get project alias from path parameters
    const projectAlias = event.pathParameters?.alias;
    if (!projectAlias) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Project alias is required in path parameters' }),
      };
    }

    // Fetch project by alias
    const project = await appDataSource.manager.findOne(ProjectEntity, {
      where: { alias: projectAlias },
    });

    if (!project) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Project not found' }),
      };
    }

    const existingPage = await appDataSource.manager.findOne(PageEntity, {
      where: { urlAlias: body.urlAlias },
    });

    if (existingPage) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'URL alias already exists' }),
      };
    }

    const page = new PageEntity();
    page.urlAlias = body.urlAlias;
    page.title = body.title;
    page.metaTags = body.metaTags;
    page.sections = body.sections;
    page.project = project;
    console.log('New Page Entity:', page);

    await appDataSource.manager.save(page);
    console.log('Page saved successfully with ID:', page.id);

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Page created successfully',
        pageId: page.id,
        urlAlias: page.urlAlias,
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