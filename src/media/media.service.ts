import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import {
  GetObjectAclCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigType } from '@nestjs/config';
import awsConfig from '../config/aws.config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { AuthService } from '../auth/auth.service';
import {InjectModel} from "@nestjs/mongoose";
import {AuthUser} from "../auth/schemas/auth-user.schema";
import {Model} from "mongoose";
import {Media} from "./schemas/media.schema";

@Injectable()
export class MediaService {
  private readonly client: S3Client;
  private readonly bucketName: string;
  constructor(
    @InjectModel(Media.name) private mediaModel: Model<Media>,
    @Inject(awsConfig.KEY)
    private awsConfigService: ConfigType<typeof awsConfig>,
    private authService: AuthService,
  ) {
    this.bucketName = awsConfigService.bucket;
    this.client = new S3Client({
      region: awsConfigService.region,
      credentials: {
        accessKeyId: awsConfigService.accessKeyID,
        secretAccessKey: awsConfigService.secretKeyID,
      },
    });
  }
  async upload(createMediaDto: CreateMediaDto) {
    try {
      const { id, file } = createMediaDto;
      const user = await this.authService.findOne(id);

      if (!user) throw new BadRequestException();

      // upload file
      const key = this.generateS3Key(user.userHash, file.originalname);
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'private',
        Metadata: {
          originalName: file.originalname,
        },
      });

      //TODO: check what is in upload response. Determine if to save.
      const uploadResponse = await this.client.send(command);
      const requestId = uploadResponse['$metadata']['requestId'] ?? null;

      await this.mediaModel.create({
        request_id: requestId,
        uploadResponse,
        userHash: user.userHash,
        script_id: createMediaDto.script_id
      });

    } catch (e) {
      if (e instanceof BadRequestException) throw new BadRequestException();
      throw new InternalServerErrorException(e);
    }
  }

  async getPresignedUrl(key: string) {
    try {
      const command = new GetObjectAclCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      const url = await getSignedUrl(this.client, command, {
        expiresIn: 60 * 60 * 24,
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  generateS3Key(emailHash: string, fileName: string): string {
    return `${emailHash}/${fileName}`;
  }
}
