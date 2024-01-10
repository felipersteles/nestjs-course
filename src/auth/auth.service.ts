import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly JWTService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async createToken(user: User) {
    return {
      acess_token: this.JWTService.sign(
        {
          sub: user.id,
          name: user.name,
          email: user.email,
        },
        { expiresIn: '1 hour', issuer: 'API Nestjs' },
      ),
    };
  }

  async validateToken(token: string) {
    return this.JWTService.verify(token);
  }

  async login(email: string, pass: string) {
    const user = await this.prisma.user.findFirst({
      where: { email, password: pass },
    });

    if (!user) throw new UnauthorizedException('E-mail e/ou senha incorretos.');

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) throw new UnauthorizedException('E-mail incorreto.');

    // todo: Enviar o email

    return true;
  }

  async reset(password: string, token: string) {
    // todo: validar token

    console.log('token', token);
    const id = 0;

    const user = await this.prisma.user.update({
      where: {
        id,
      },

      data: {
        password,
      },
    });

    return this.createToken(user);
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);

    return this.createToken(user);
  }
}
