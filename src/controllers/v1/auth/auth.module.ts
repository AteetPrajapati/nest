import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { DatabaseModule } from '@/database/database.module';
import { JwtAuthGuard } from '@/common/gaurds';
import { JwtStrategy } from '@/common/providers';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.jwtSecret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtAuthGuard, JwtStrategy],
})
export class AuthModule {}
