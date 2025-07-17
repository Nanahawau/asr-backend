import { Injectable } from '@nestjs/common';
import { CreateEthnicityDto } from './dto/create-ethnicity.dto';
import { UpdateEthnicityDto } from './dto/update-ethnicity.dto';
import { CreateScriptDto } from './dto/create-script.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AuthUser } from '../auth/schemas/auth-user.schema';
import { Model } from 'mongoose';
import { Script } from './schemas/script.schema';
import { Ethnicity } from './schemas/ethnicity.schema';
import { UpdateScriptDto } from './dto/update-script.dto';

@Injectable()
export class DemographyService {
  constructor(
    @InjectModel(Script.name) private scriptModel: Model<Script>,
    @InjectModel(Ethnicity.name) private ethnicityModel: Model<Ethnicity>,
  ) {}

  async createEthnicity(createEthnicityDto: CreateEthnicityDto) {
    return this.ethnicityModel.create({
      ethnicity: createEthnicityDto.ethnicity,
    });
  }

  async createScript(createScriptDto: CreateScriptDto) {
    return this.scriptModel.create({
      text: createScriptDto.text,
    });
  }

  async updateScript(updateScriptDto: UpdateScriptDto) {
    return this.scriptModel.updateOne(
      { _id: updateScriptDto.id },
      {
        text: updateScriptDto.text,
      },
      { upsert: true },
    );
  }

  async findAllEthnicities() {
    return this.ethnicityModel.find();
  }

  async findAllScripts() {
    return this.scriptModel.find();
  }
}
