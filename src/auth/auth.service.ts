import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Users } from '../users/users.model';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: AuthUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: AuthUserDto) {
    const candidate = await this.userService.getUserByName(userDto.name);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким именем существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private generateToken(user: Users) {
    const payload = { name: user.name, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: AuthUserDto) {
    const user = await this.userService.getUserByName(userDto.name);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Некорректный пороль или имя' });
  }

  async updateScore(score: number, token: string) {
    if (!token) {
      throw new UnauthorizedException({ message: 'Не авторизирован' });
    }
    const decoded = await this.jwtService.verify(token);
    const user = await this.userService.getUserByName(decoded.name);
    user.score = score;
    await user.save();
    return
  }
}
