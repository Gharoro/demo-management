import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KycVerification, KycStatus } from './entities/kyc-verification.entity';
import { CreateKycVerificationDto } from './dto/create-kyc-verification.dto';
import { ninData, bvnData } from '../utils/data';

@Injectable()
export class KycService {
  constructor(
    @InjectRepository(KycVerification)
    private readonly kycRepository: Repository<KycVerification>,
  ) {}

  async initiateVerification(
    dto: CreateKycVerificationDto,
  ): Promise<KycVerification> {
    const kycRecord = this.kycRepository.create({
      nin: dto.nin,
      bvn: dto.bvn,
      firstName: dto.firstName,
      lastName: dto.lastName,
      status: KycStatus.PENDING,
    });

    const savedRecord = await this.kycRepository.save(kycRecord);

    this.runBackgroundVerification(savedRecord.id, dto);

    return savedRecord;
  }

  private async runBackgroundVerification(
    recordId: string,
    dto: CreateKycVerificationDto,
  ): Promise<void> {
    try {
      const ninRecord = ninData.find((n) => n.nin === dto.nin);

      if (!ninRecord) {
        console.log('Invalid NIN, please provide a new NIN');
        await this.updateVerificationStatus(
          recordId,
          KycStatus.FAILED,
          'NIN not found, lookup failed.',
        );
        return;
      }

      if (ninRecord.status !== 'verified') {
        console.log('Invalid NIN, please provide a new NIN');
        await this.updateVerificationStatus(
          recordId,
          KycStatus.FAILED,
          `NIN status is ${ninRecord.status}`,
        );
        return;
      }

      const bvnRecord = bvnData.find((b) => b.bvn === dto.bvn);

      if (!bvnRecord) {
        console.log('Invalid BVN, please provide a new BVN');
        await this.updateVerificationStatus(
          recordId,
          KycStatus.FAILED,
          'BVN not found, lookup failed.',
        );
        return;
      }

      if (bvnRecord.status !== 'verified') {
        console.log('Invalid BVN, please provide a new BVN');
        await this.updateVerificationStatus(
          recordId,
          KycStatus.FAILED,
          `BVN status is ${bvnRecord.status}`,
        );
        return;
      }

      const matchScore = this.calculateNameMatchScore(
        dto.firstName,
        dto.lastName,
        bvnRecord.firstName,
        bvnRecord.lastName,
      );

      if (matchScore < 50) {
        console.log(
          `Name verification failed. Match score: ${matchScore}%. Both names do not match.`,
        );
        await this.updateVerificationStatus(
          recordId,
          KycStatus.FAILED,
          `Name match score ${matchScore}% is below 50% threshold`,
        );
        return;
      }

      console.log(
        `KYC verification successful! Match score: ${matchScore}%. Storing verification record.`,
      );
      await this.updateVerificationStatus(
        recordId,
        KycStatus.VERIFIED,
        `Verification successful with ${matchScore}% name match`,
      );
    } catch (error) {
      console.error('Error during background verification:', error);
      await this.updateVerificationStatus(
        recordId,
        KycStatus.FAILED,
        'Internal verification error',
      );
    }
  }

  private calculateNameMatchScore(
    inputFirstName: string,
    inputLastName: string,
    actualFirstName: string,
    actualLastName: string,
  ): number {
    const firstNameMatch =
      inputFirstName.toLowerCase() === actualFirstName.toLowerCase();
    const lastNameMatch =
      inputLastName.toLowerCase() === actualLastName.toLowerCase();

    if (firstNameMatch && lastNameMatch) {
      return 100;
    } else if (firstNameMatch || lastNameMatch) {
      return 50;
    } else {
      return 0;
    }
  }

  private async updateVerificationStatus(
    recordId: string,
    status: KycStatus,
    message: string,
  ): Promise<void> {
    await this.kycRepository.update(recordId, {
      status,
      verificationMessage: message,
    });
  }
}
