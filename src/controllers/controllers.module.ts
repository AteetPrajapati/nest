import { Module } from '@nestjs/common';
import { UserModule } from './v1/user/user.module';
import { AuthModule } from './v1/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
})
export class ControllersModule {}
