import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ScriptDocument = HydratedDocument<Script>;

@Schema()
export class Script {
  @Prop({ required: true })
  text: string;
}

export const ScriptSchema = SchemaFactory.createForClass(Script);
