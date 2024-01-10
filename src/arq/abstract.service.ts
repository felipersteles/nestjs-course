import { Injectable, Logger } from '@nestjs/common';

/**
 * Serviço abstrato que contem alguns recursos utilizados por todos os serviços
 */
@Injectable()
export class AbstractService {
  protected readonly logger;
  // detalhe que sempre ao criar um serviço deve ter um logger para tratativa de erros
  constructor(context: string) {
    this.logger = new Logger(context);
  }
}
