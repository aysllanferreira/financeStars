import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwkToPem from 'jwk-to-pem';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AwsCognitoStrategy extends PassportStrategy(
  Strategy,
  'aws-cognito',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: async (request, rawJwtToken, done) => {
        const decodedToken: any = jwt.decode(rawJwtToken, { complete: true });
        const kid = decodedToken.header.kid;

        const region = process.env.AWS_REGION;
        const poolID = process.env.USER_POOL_ID;

        const cognitoIssuer = `https://cognito-idp.${region}.amazonaws.com/${poolID}`;
        const cognitoJwksUrl = `${cognitoIssuer}/.well-known/jwks.json`;
        const jwks = await axios.get(cognitoJwksUrl);
        const jwk = jwks.data.keys.find((key) => key.kid === kid);
        const pem = jwkToPem(jwk);

        done(null, pem);
      },
    });
  }

  async validate(payload: any) {
    // Here you can add extra validation or fetch/add user related data
    return payload;
  }
}
