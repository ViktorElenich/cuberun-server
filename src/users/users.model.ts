import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface UserModelCreationAttrs {
  name: string;
  password: string;
  score: number;
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

  @ApiProperty({ example: '8.23', description: 'Очки гонки'})
  @Column({ type: DataType.INTEGER, allowNull: false })
  score?: number;

}