import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (isNaN(Number(req.params.id)) || Number(req.params.id) < 1) {
      throw new BadRequestException('Id must be a number.');
    }

    next();
  }
}
