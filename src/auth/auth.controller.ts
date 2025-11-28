import { Controller, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login-dto/loginDto';
import { Body, Post ,Get} from '@nestjs/common';
import { Authenticate } from 'src/authenticate/authenticate.guard';
import { Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import {
  LoginResponseDto,
  ErrorResponseDto,
} from '../common/dto/api-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Get("/images")
  getAllResources(){
    return [
      "one.jpg",
      "two.jpg",
      "three.jpg",
      "four.jpg",
      "five.jpg",
      "six.jpg",
      "seven.jpg",
      "eight.jpg",
      "nine.jpg",
      "ten.jpg",
      "vibhu.jpg"
    ];
    
  }

  @Get("/preview")
previewRedirect(@Res() res: Response) {

  // Dummy meta data (fallback if query not provided)
  const ogTitle =  "MyNicks Building – Premium Doors";
  const ogDesc =   "This door is designed with a timeless elegance that suits both classic and modern homes. Made from premium materials, it delivers exceptional strength and a refined appearance";
  const ogImage = "https://stg.mynicksbuilding.com/gallery/sku_images/small/AC401-101_Frst_Sml.jpg";

  // The URL where the user will actually land
  const redirectUrl = "https://angular.mynicksbuilding.com/";

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8" />

        <!-- OG Tags for WhatsApp / LinkedIn / FB -->
        <meta property="og:title" content="${ogTitle}" />
        <meta property="og:description" content="${ogDesc}" />
        <meta property="og:image" content="${ogImage}" />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="${redirectUrl}" />

        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image">

        <title>${ogTitle}</title>

        <!-- Auto Redirect to Angular CSR -->
        <script>
          window.location.href = "${redirectUrl}";
        </script>
    </head>
    <body>
    Redirecting…
    </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  return res.send(html);
}



  @UseGuards(Authenticate)
  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate user and return JWT tokens',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    type: ErrorResponseDto,
  })
  @ApiBearerAuth()
  login(@Req() req) {
    const { _id, role ,email} = req.user;
    
    const tokens = this.authService.loginUser({ userId: _id, role: role, email:email });

    return tokens;
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'Refresh token',
    description: 'Get new access token using refresh token',
  })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed successfully',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid refresh token',
    type: ErrorResponseDto,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refreshToken: { type: 'string', description: 'Refresh token' },
      },
    },
  })
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
