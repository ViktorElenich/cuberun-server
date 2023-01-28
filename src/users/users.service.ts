import { Users } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private userRepository: typeof Users,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAll() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByName(name: string) {
    const user = await this.userRepository.findOne({
      where: { name },
      include: { all: true },
    });
    return user;
  }
}
