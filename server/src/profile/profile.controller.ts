import {
  Controller,
  Post,
  Req,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('update')
  @UseInterceptors(FileInterceptor('picture', { limits: { files: 1 } }))
  async updateProfile(@UploadedFile() file, @Req() req, @Res() res) {
    const { username, first_name, last_name } = req.body;
    if (!username || !first_name || !last_name) {
      res.status(400).send('Missing required parameters');
      return;
    }
    try {
      await this.profileService.updateUserAttributes(
        username,
        first_name,
        last_name,
      );
      res.status(200).send('Profile updated successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
