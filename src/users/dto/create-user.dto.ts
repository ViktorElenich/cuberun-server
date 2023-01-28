import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Vasya', description: 'Имя'})
  readonly name: string;

  @ApiProperty({ example: '123456', description: 'Пароль'})
  readonly password: string;
}