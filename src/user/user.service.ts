import { Injectable } from '@nestjs/common';
import { CreateUserDTO, UpdatePatchUserDTO, UpdatePutUserDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AbstractService } from 'src/arq/abstract.service';

/**
 * Classe que acessa o banco de dados na entidade de usuário
 *
 * @param CreateUserDTO
 * @returns
 */
@Injectable()
export class UserService extends AbstractService {
  constructor(private readonly prisma: PrismaService) {
    super(UserService.name);
  }

  /**
   * Método responsável por cadastrar usuário no banco de dados
   *
   * @param CreateUserDTO
   * @returns
   */
  async create({ email, name, password }: CreateUserDTO) {
    return await this.prisma.user
      .create({
        data: { email, name, password },
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        this.logger.error(error.message);
        throw new Error();
      });
  }

  async getAllUsers() {
    return await this.prisma.user.findMany();
  }

  async getUserById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdatePutUserDTO) {
    return this.prisma.user.update({
      data,

      where: {
        id,
      },
    });
  }

  async updatePartial(id: number, data: UpdatePatchUserDTO) {
    return this.prisma.user.update({
      data,

      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
