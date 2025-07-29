import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';
import { ControllersModule } from './controllers/controllers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRoot(process.env.mongoUri!),
    DatabaseModule,
    ControllersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
