import {IsBoolean, IsString} from "class-validator";

export class CreateUserConsentDto {
    @IsString()
    user_id: string;
    @IsBoolean()
    has_consented: boolean
}