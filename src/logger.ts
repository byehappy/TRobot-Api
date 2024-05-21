import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url, headers, body } = request;
    const userAgent = request.get('user-agent') || '';

    // Логирование заголовков запроса
    this.logger.log(`Request Headers: ${JSON.stringify(headers)}`);

    // Логирование тела запроса (если оно есть)
    if (Object.keys(body).length) {
      this.logger.log(`Request Body: ${JSON.stringify(body)}`);
    }

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`
      );
    });

    next();
  }
}
