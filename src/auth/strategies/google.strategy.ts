// import { Inject, Injectable } from '@nestjs/common';
// import { ConfigType } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Strategy, VerifyCallback } from 'passport-google-oauth2';
// import { AuthUser } from '../entities/authuser.entity';
// import config from '../../config/default.config';
// import googleOauthConfig from '../../config/google-oauth.config';
// import {StrategyOptions} from "passport-jwt";
// @Injectable()
// export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
//   constructor(
//     @Inject(googleOauthConfig.KEY)
//     private googleOAuthConfig: ConfigType<typeof googleOauthConfig>,
//     @InjectRepository(AuthUser) private userRepository: Repository<AuthUser>,
//   ) {
//     super({
//       clientID: googleOAuthConfig.clientID,
//       clientSecret: googleOAuthConfig.clientSecret,
//       callbackURL: googleOAuthConfig.callbackURL,
//       scope: ['profile', 'email']
//     });
//   }
//
//   async validate(
//     _accessToken: string,
//     _refreshToken: string,
//     profile: any,
//     done: VerifyCallback,
//   ): Promise<any> {
//     const { id, name, emails, photos } = profile;
//
//     const user = {
//       provider: 'google',
//       providerId: id,
//       email: emails[0].value,
//       name: `${name.givenName} ${name.familyName}`,
//       picture: photos[0].value,
//     };
//
//     done(null, user);
//   }
// }
