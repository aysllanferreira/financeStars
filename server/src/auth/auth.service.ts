import { Injectable } from '@nestjs/common';
import {
  CognitoUserPool,
  CognitoUser,
  CognitoUserAttribute,
  AuthenticationDetails,
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

  async confirmSignUp(email: string, code: string): Promise<void> {
    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async signIn(email: string, password: string): Promise<string> {
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
          resolve(result.getIdToken().getJwtToken());
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
}
