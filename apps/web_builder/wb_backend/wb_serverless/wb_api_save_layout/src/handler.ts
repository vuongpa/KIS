import { APIGatewayProxyHandler } from 'aws-lambda';
import { getConnectionOptions, loadEnvConfig } from '@kis/common';
import { getAppDataSource } from '@kis/wb-data/dist/app-data-source';
import { LayoutEntity } from '@kis/wb-data/dist/entities'; 

export const getLayouts: APIGatewayProxyHandler = async (event) => {
  console.log('Handler getLayouts invoked!'); 
  console.log('Event:', event);
  loadEnvConfig();
  console.log('Environment config loaded');

  try {
    const connectionOptions = getConnectionOptions();
    const appDataSource = getAppDataSource(connectionOptions);
    if (!appDataSource.isInitialized) {
      console.log('Initializing DataSource...');
      await appDataSource.initialize();
    }

    console.log('Fetching layouts from database...');
    const layouts = await appDataSource.getRepository(LayoutEntity).find();
    console.log('Layouts fetched:', layouts); 

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: layouts,
      }),
    };
  } catch (error) {
    console.error('Error fetching layouts:', error); 
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'An error occurred while fetching layouts',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};