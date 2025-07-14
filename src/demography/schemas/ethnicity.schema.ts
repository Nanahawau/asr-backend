import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type EthnicityDocument = HydratedDocument<Ethnicity>;

@Schema()
export class Ethnicity {
  @Prop({ required: true })
  ethnicity: string;
}

export const EthnicitySchema = SchemaFactory.createForClass(Ethnicity);
