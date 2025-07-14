import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthUser } from './schemas/auth-user.schema';
import { Model } from 'mongoose';
import { CreateAuthUserDto } from './dto/create-auth-user.dto';
import {createHash} from "crypto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthUser.name) private authUserModel: Model<AuthUser>
  ) {}

  async create(createAuthUserDto: CreateAuthUserDto): Promise<{ id: string }> {
    try {
      const { email, demographyData } = createAuthUserDto;
      const emailHash = this.hashString(email);
      let user = await this.authUserModel.findOne({ userHash: emailHash });

      if (!user) {
        user = await this.authUserModel.create({
          userHash: emailHash,
          ethnicity: demographyData.ethnicity,
          age: demographyData.age,
          sex: demographyData.sex,
          nativeEnglishSpeaker: demographyData.nativeEnglishSpeaker,
        });
      }

      return {
        id: user.id,
      };
    } catch (e) {











      throw new InternalServerErrorException(e);
    }
  }

  async findOne(id: string): Promise<AuthUser | null> {
    return this.authUserModel.findOne({ _id: id });
  }

  hashString(value: string) {
    return createHash('sha256').update(value.toLowerCase().trim()).digest('hex');
  }

  isMatch(value: string, hash: string): boolean {
    return this.hashString(value) === hash;
  }
}
