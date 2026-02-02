import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { KycService } from './kyc.service';
import { CreateKycVerificationDto } from './dto/create-kyc-verification.dto';

@Controller('kyc')
export class KycController {
  constructor(private readonly kycService: KycService) {}

  @Post('verify')
  @HttpCode(HttpStatus.ACCEPTED)
  async initiateKycVerification(@Body() dto: CreateKycVerificationDto) {
    const record = await this.kycService.initiateVerification(dto);

    return {
      message: 'KYC verification initiated. Processing in the background.',
      id: record.id,
      status: record.status,
    };
  }
}
