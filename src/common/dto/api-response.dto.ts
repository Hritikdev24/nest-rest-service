import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
  @ApiProperty({ description: 'Response status', example: 'success' })
  status: string;

  @ApiProperty({ description: 'Response message', example: 'Operation completed successfully' })
  message: string;

  @ApiProperty({ description: 'Response data' })
  data: T;

  @ApiProperty({ description: 'Response timestamp', example: '2024-01-01T00:00:00.000Z' })
  timestamp: string;
}

export class LoginResponseDto {
  @ApiProperty({ description: 'JWT access token', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;

  @ApiProperty({ description: 'JWT refresh token', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  refreshToken: string;
}

export class ErrorResponseDto {
  @ApiProperty({ description: 'Error status', example: 'error' })
  status: string;

  @ApiProperty({ description: 'Error message', example: 'Something went wrong' })
  message: string;

  @ApiProperty({ description: 'Error timestamp', example: '2024-01-01T00:00:00.000Z' })
  timestamp: string;

  @ApiProperty({ description: 'Error details', required: false })
  details?: any;
}
