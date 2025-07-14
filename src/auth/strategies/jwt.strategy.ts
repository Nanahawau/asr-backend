// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
// import { ConfigType } from '@nestjs/config';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { AuthUser } from '../entities/authuser.entity';
// import JwtConfig from "../../config/jwt.config";
//
// export type JwtPayload = {
//   sub: string;
//   email: string;
// };
//
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
//   constructor(
//     @Inject(JwtConfig.KEY) private jwtConfig: ConfigType<typeof JwtConfig>,
//     @InjectRepository(AuthUser) private authUserRepository: Repository<AuthUser>,
//   ) {
//     const extractJwt = (req: any) => {
//       return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
//     };
//
//     super({
//       ignoreExpiration: false,
//       secretOrKey: jwtConfig.secret,
//       jwtFromRequest: extractJwt,
//     });
//   }
//
//   async validate(payload: JwtPayload) {
//     // const authUser = await this.authUserRepository.findOne({ userHash: payload.sub });
//     const user = {}
//     if (!user) throw new UnauthorizedException('Please log in to continue');
//
//     return {
//       id: payload.sub,
//       email: payload.email,
//     };
//   }
// }
