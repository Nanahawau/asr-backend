import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MediaDocument = HydratedDocument<Media>;
@Schema()
export class Media {
  @Prop({ type: Object })
  uploadResponse: Record<string, any>;

  @Prop({ index: true })
  request_id: string;

  @Prop({ required: true, index: true })
  userHash: string;

  @Prop({ required: true, index: true })
  script_id: string;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
