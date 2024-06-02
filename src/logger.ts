import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from 'winston';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
  ) {
  }


  use(request: Request, response: Response, next: NextFunction): void {
    const { method, url, headers, query, params, ip } = request;
    const startTime = process.hrtime();

    response.on('finish', () => {
      const { statusCode } = response;
      const [seconds, nanoseconds] = process.hrtime(startTime);
      const responseTime = (seconds * 1e3 + nanoseconds / 1e6).toFixed(3);

      const log = {
        req: {
          method,
          url,
          query,
          params,
          headers,
          remoteAddress: ip,
          remotePort: request.socket.remotePort,
        },
        res: {
          statusCode,
          headers: response.getHeaders(),
        },
        responseTime,
      };

      this.logger.log({level:'info',message:`INFO: request completed ${JSON.stringify(log)}`});
    });

    response.on('error', (err) => {
      const [seconds, nanoseconds] = process.hrtime(startTime);
      const responseTime = (seconds * 1e3 + nanoseconds / 1e6).toFixed(3);

      const errorLog = {
        req: {
          method,
          url,
          query,
          params,
          headers,
          remoteAddress: ip,
          remotePort: request.socket.remotePort,
        },
        error: {
          message: err.message,
          stack: err.stack,
        },
        responseTime,
      };

      const timestamp = new Date().toISOString();
      this.logger.error(`ERROR: request failed ${JSON.stringify(errorLog)}`, timestamp);
    });

    next();
  }
}
