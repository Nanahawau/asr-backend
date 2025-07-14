import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DemographyService } from './demography.service';
import { CreateEthnicityDto } from './dto/create-ethnicity.dto';

import {CreateScriptDto} from "./dto/create-script.dto";

@Controller('demography')
export class DemographyController {
  constructor(private readonly demographyService: DemographyService) {}

  @Post('ethnicity')
  async createEthnicity(@Body() createEthnicityDto: CreateEthnicityDto) {
    return await this.demographyService.createEthnicity(createEthnicityDto);
  }

  @Post('script')
  async createScript(@Body() createScriptDto: CreateScriptDto) {
    return await this.demographyService.createScript(createScriptDto);
  }

  @Get('ethnicity')
  async findAllEthnicities() {
    return await this.demographyService.findAllEthnicities();
  }

  @Get('script')
  async findAllScripts() {
    return await this.demographyService.findAllScripts();
  }
}
