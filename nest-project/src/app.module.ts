import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KycModule } from './kyc/kyc.module';
import { KycVerification } from './kyc/entities/kyc-verification.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'kyc_database.sqlite',
      entities: [KycVerification],
      synchronize: true,
    }),
    KycModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
