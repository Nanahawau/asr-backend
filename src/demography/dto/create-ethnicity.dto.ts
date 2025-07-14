import {IsString} from "class-validator";

export class CreateEthnicityDto {
    @IsString()
    ethnicity: string;
}
