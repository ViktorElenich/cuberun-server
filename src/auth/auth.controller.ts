import { Body, Controller, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { ScoreUserDto } from './dto/score-user.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: AuthUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: AuthUserDto) {
    return this.authService.registration(userDto)
  }

  @Patch('/score')
  updateScore(@Body() scoreDto: ScoreUserDto) {
    return this.authService.updateScore(scoreDto.score, scoreDto.token);
  }
}
