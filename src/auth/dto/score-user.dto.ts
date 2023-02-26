import { ApiProperty } from '@nestjs/swagger';

export class ScoreUserDto {
  @ApiProperty({ example: 1235, description: 'Скор' })
  readonly score: number;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1', description: 'Токен' })
  readonly token: string;
}