import { Injectable } from '@nestjs/common';
import { CognitoIdentityServiceProvider, S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProfileService {
  private readonly cognitoIdentityServiceProvider: CognitoIdentityServiceProvider;
  private readonly s3: S3;

  constructor() {
    this.cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider({
      region: process.env.AWS_REGION,
    });
    this.s3 = new S3({ region: process.env.AWS_REGION });
  }

  async updateUserAttributes(
    username: string,
    firstName: string,
    lastName: string,
  ) {
    const userAttributes = [
      { Name: 'given_name', Value: firstName },
      { Name: 'family_name', Value: lastName },
    ];

    await this.cognitoIdentityServiceProvider
      .adminUpdateUserAttributes({
        UserPoolId: process.env.USER_POOL_ID,
        Username: username,
        UserAttributes: userAttributes,
      })
      .promise();
  }
}
