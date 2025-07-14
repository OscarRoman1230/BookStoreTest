import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';

/**
 * Usa el formato “combined” de morgan y envía la salida al logger nativo de Nest.
 * Puedes personalizar el formato o la salida según necesites.
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = morgan('combined');

  use(req: Request, res: Response, next: NextFunction) {
    this.logger(req, res, next);
  }
}
