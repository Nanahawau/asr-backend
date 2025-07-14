import { Module } from '@nestjs/common';
import { DemographyService } from './demography.service';
import { DemographyController } from './demography.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUser, AuthUserSchema } from '../auth/schemas/auth-user.schema';
import { Script, ScriptSchema } from './schemas/script.schema';
import { Ethnicity, EthnicitySchema } from './schemas/ethnicity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Script.name, schema: ScriptSchema }]),
    MongooseModule.forFeature([
      { name: Ethnicity.name, schema: EthnicitySchema },
    ]),
  ],
  controllers: [DemographyController],
  providers: [DemographyService],
})
export class DemographyModule {}
