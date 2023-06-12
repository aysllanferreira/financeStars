import { Injectable } from '@nestjs/common';
import {
  CognitoUserPool,
  CognitoUser,
  CognitoUserAttribute,
  AuthenticationDetails,
  CognitoRefreshToken,
} from 'amazon-cognito-identity-js';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;

  constructor() {
    const poolData = {
      UserPoolId: process.env.USER_POOL_ID,
      ClientId: process.env.CLIENT_ID,
    };

    this.userPool = new CognitoUserPool(poolData);
  }

  async signUp(email: string, password: string): Promise<any> {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
    ];

    return new Promise((resolve, reject) => {
      this.userPool.signUp(
        email,
        password,
        attributeList,
        null,
        (err: Error, result) => {
          if (err) {
            reject(new HttpException(err.message, HttpStatus.BAD_REQUEST));
          } else {
            resolve(result.user.getUsername());
          }
        },
      );
    });
  }

  async confirmSignUp(email: string, code: string): Promise<void> {
    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, (err: Error, result) => {
        if (err) {
          reject(new HttpException(err.message, HttpStatus.BAD_REQUEST));
        } else {
          resolve(result);
        }
      });
    });
  }

  async signIn(email: string, password: string): Promise<any> {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          const refreshToken = result.getRefreshToken().getToken(); // getting the refreshToken
          resolve({
            idToken: result.getIdToken().getJwtToken(),
            refreshToken: refreshToken,
          });
        },
        onFailure: (err: Error) => {
          reject(new HttpException(err.message, HttpStatus.UNAUTHORIZED));
        },
      });
    });
  }

  async validateTokenAndGetUser(jwtToken: string): Promise<any> {
    const decodedToken: any = jwt.decode(jwtToken, { complete: true });

    const username = decodedToken.payload['cognito:username'] || '';
    const email = decodedToken.payload['email'] || '';
    const family_name = decodedToken.payload['family_name'] || '';
    const given_name = decodedToken.payload['given_name'] || '';
    const picture = decodedToken.payload['picture'] || '';

    if (email || family_name || given_name || picture) {
      return {
        username: username,
        email: email,
        family_name: family_name,
        given_name: given_name,
        picture: picture,
      };
    }

    const userData = {
      Username: username,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.getUserAttributes((err: Error, result) => {
        if (err) {
          reject(new HttpException(err.message, HttpStatus.UNAUTHORIZED));
        } else {
          const userAttributes: {
            email?: string;
            family_name?: string;
            given_name?: string;
            picture?: string;
            [key: string]: any;
          } = result.reduce((obj, attribute) => {
            obj[attribute.getName()] = attribute.getValue();
            return obj;
          }, {});

          userAttributes.email = userAttributes.email || '';
          userAttributes.family_name = userAttributes.family_name || '';
          userAttributes.given_name = userAttributes.given_name || '';
          userAttributes.picture = userAttributes.picture || '';

          resolve(userAttributes);
        }
      });
    });
  }

  async refreshToken(username: string, refreshToken: string): Promise<string> {
    const userData = {
      Username: username,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.refreshSession(
        new CognitoRefreshToken({ RefreshToken: refreshToken }),
        (err: Error, session) => {
          if (err) {
            reject(new HttpException(err.message, HttpStatus.UNAUTHORIZED));
          } else {
            resolve(session.getIdToken().getJwtToken());
          }
        },
      );
    });
  }
}
