import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('audio')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAudio(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.webm' }),
          // new MaxFileSizeValidator({
          //   maxSize: 1000000,
          //   message: 'File is too large, Max File size is 20MB'
          // }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
    @Query('id') id: string,
    @Query('script_id') script_id: string,
  ) {
    return this.mediaService.upload({ file, id, script_id });
  }
}
