import { IsNotEmpty, IsString } from 'class-validator';

export class CreateKycVerificationDto {
  @IsString()
  @IsNotEmpty()
  nin: string;

  @IsString()
  @IsNotEmpty()
  bvn: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
