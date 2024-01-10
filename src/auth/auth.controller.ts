import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDTO, AuthForgetDTO, AuthResetDTO } from './dto';
import { AuthService } from './auth.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: AuthLoginDTO) {
    return this.authService.login(data.email, data.password);
  }

  @Post('register')
  async register(@Body() data: AuthRegisterDTO) {
    return this.authService.register(data);
  }

  @Post('forget')
  async forget(@Body() data: AuthForgetDTO) {
    return this.authService.forget(data.email);
  }

  @Post('reset')
  async reset(@Body() data: AuthResetDTO) {
    return this.authService.reset(data.password, data.token);
  }
}
