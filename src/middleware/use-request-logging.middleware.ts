import { Logger } from '@nestjs/common';
import * as morgan from 'morgan';

export function useRequestLoggingMiddleware(app) {
  const logger = new Logger('Request');
  app.use(
    morgan('tiny', {
      stream: {
        write: (message) => logger.log(message.replace('\n', '')),
      },
    }),
  );
}
