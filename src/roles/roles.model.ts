import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../users/users.model';
import { UserRoles } from './user-roles.model';

interface RoleModelCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: "roles" })
export class Role extends Model<Role, RoleModelCreationAttrs> {

  @ApiProperty({ example: '1', description: 'Уникальный индификатор'})
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Уникальное значение пользователя'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({ example: 'Администратор', description: 'Описание роли'})
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => Users, () => UserRoles)
  users: Users[]

}