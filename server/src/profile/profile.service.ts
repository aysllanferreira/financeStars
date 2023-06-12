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
    pictureFile: any,
  ) {
    const userAttributes = [
      { Name: 'given_name', Value: firstName },
      { Name: 'family_name', Value: lastName },
    ];

    if (pictureFile) {
      const pictureKey = `${username}/${uuidv4()}`;
      await this.s3
        .upload({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: pictureKey,
          Body: pictureFile.buffer,
          ACL: 'public-read', // This allows the file to be read publicly
        })
        .promise();

      userAttributes.push({ Name: 'picture', Value: pictureKey });
    }

    await this.cognitoIdentityServiceProvider
      .adminUpdateUserAttributes({
        UserPoolId: process.env.USER_POOL_ID,
        Username: username,
        UserAttributes: userAttributes,
      })
      .promise();
  }
}
