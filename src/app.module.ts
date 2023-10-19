import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HeroModule } from './hero/hero.module';

@Module({
  imports: [UserModule, HeroModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
