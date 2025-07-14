import { PartialType } from '@nestjs/swagger';
import { CreateScriptDto } from './create-script.dto';
import {IsString} from "class-validator";

export class UpdateScriptDto extends PartialType(CreateScriptDto) {
    @IsString()
    id: string
}
