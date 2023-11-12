import { IUserEntity } from "../../domain/entities/userEntity"
import { InputUpdateUserDto } from "../dto/userDto"

export const IUserRepositoryToken = Symbol.for('IUserRepository')

export interface IUserRepository {
  create(userEntity: IUserEntity): Promise<IUserEntity>
  get(userId: string): Promise<IUserEntity>
  update(updateProps: InputUpdateUserDto): Promise<IUserEntity>
  delete(userId: string): Promise<boolean>
}