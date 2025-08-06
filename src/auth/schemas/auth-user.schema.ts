import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthUserDocument = HydratedDocument<AuthUser>;

@Schema()
export class AuthUser {
  @Prop({ required: true, index: true})
  userHash: string;
  @Prop()
  ethnicity: string; // TODO:  provide ethnicity endpoint
  @Prop()
  age: number;
  @Prop()
  sex: string; // TODO: use enum
  @Prop()
  nativeEnglishSpeaker: boolean
  @Prop()
  hasConsented: boolean
}

export const AuthUserSchema = SchemaFactory.createForClass(AuthUser);
