import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO, UpdatePatchUserDTO, UpdatePutUserDTO } from './dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/interrceptor/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator';

/**
 * Classe responsavel por se comunicar com o cliente
 *
 * @params
 * @returns
 *
 */
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(LogInterceptor)
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async list() {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  async show(@ParamId() id: number) {
    return this.userService.getUserById(id);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePutUserDTO,
  ) {
    return this.userService.update(id, data);
  }

  @Patch('/:id')
  async updatePartial(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePatchUserDTO,
  ) {
    return this.userService.updatePartial(id, data);
  }

  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
