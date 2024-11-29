import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  login(@Body() body: any) {
    return 'login';
  }
}
