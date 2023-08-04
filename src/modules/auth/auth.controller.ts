import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDTO, SignupDTO } from './dtos';
import { Public } from 'src/common';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }

  @Post('signup')
  signup(@Body() body: SignupDTO) {
    return this.authService.signup(body);
  }
}
