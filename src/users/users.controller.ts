import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Users } from './users.model';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя'})
  @ApiResponse({ status: 200, type: Users })
  @Post()
  create(@Body() userDTO: CreateUserDto) {
    return this.usersService.createUser(userDTO);
  }

  @ApiOperation({ summary: 'Получить всех пользователей'})
  @ApiResponse({ status: 200, type: [Users] })
  @Get()
  getAllUsers() {
    return this.usersService.getAll();
  }
}
