import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from '@/common/dto';
import { JwtAuthGuard } from '@/common/gaurds';
import { Roles } from '@/common/decorators';
import { RolesGuard } from '@/common/gaurds/roles.guard';
import { YupValidationPipe } from '@/common/pipes';
import { createUserSchema } from '@/common/validators/user.validators';
import { loginUserSchema } from '@/common/validators/auth.validators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body(new YupValidationPipe(createUserSchema)) body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body(new YupValidationPipe(loginUserSchema)) body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('refresh')
  refresh(@Body('refreshToken') token: string) {
    return this.authService.refreshToken(token);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return {
      data: req.user,
      message: 'User profile retrieved successfully',
      status: true,
    };
  }

  @Get('admin')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  adminRoute(@Req() req) {
    return { message: 'Hello Admin', user: req.user };
  }
}
