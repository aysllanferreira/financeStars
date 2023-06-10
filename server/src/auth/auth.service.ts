// auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from 'amazon-cognito-identity-js';
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

  async signUp(username: string, password: string): Promise<any> {
    const attributeList = [];

    return new Promise((resolve, reject) => {
      this.userPool.signUp(
        username,
        password,
        attributeList,
        null,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.user.getUsername());
          }
        },
      );
    });
  }

  async signIn(username: string, password: string): Promise<string> {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const userData = {
      Username: username,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result.getIdToken().getJwtToken());
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
}
