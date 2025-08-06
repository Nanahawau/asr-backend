import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum Gender {
  F = 'f',
  M = 'm',
}
class DemographyData {
  @IsEnum(Gender, {
    message: 'Gender must be either "f" or "m"',
  })
  sex: string;
  @IsBoolean()
  nativeEnglishSpeaker: boolean;
  @IsInt()
  age: number;
  @IsString()
  ethnicity: string;
}

export class CreateAuthUserDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DemographyData)
  demographyData: DemographyData;
}
