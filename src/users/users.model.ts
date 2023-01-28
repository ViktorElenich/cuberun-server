import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';

interface UserModelCreationAttrs {
  name: string;
  password: string;
}

@Table({ tableName: "users" })
export class Users extends Model<Users, UserModelCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный индификатор'})
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'Vasya', description: 'Имя'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({ example: '123456', description: 'Пароль'})
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @BelongsToMany(() => Users, () => UserRoles)
  roles: Role[]

}