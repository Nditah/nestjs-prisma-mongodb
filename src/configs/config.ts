import { Config } from './config.interface';

const config: Config = {
  nest: {
    adminEmails: process.env.ADMIN_EMAILS,
    port: parseInt(process.env.PORT, 10),
    socketPort: process.env.SOCKET_PORT,
    fileSizeLimit:
      parseInt(process.env.FILE_SIZE_LIMIT, 10) || 25 * 1024 * 1024,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Assignment Backend',
    description: 'The MEARN Backend API description',
    version: '1.5',
    path: 'api',
  },
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: './src/schema.graphql',
    sortSchema: true,
  },
};

export default (): Config => config;
