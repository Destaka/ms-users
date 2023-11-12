import { inject, injectable } from "inversify"

import { UserModel } from "../models/userModel"
import { IUserEntity } from "../../domain/entities/userEntity"
import { IUserRepository } from "../../business/repositories/iUserRepository"
import { InputUpdateUserDto } from "../../business/dto/userDto"
import { Condition } from "dynamoose"

enum Prefixes {
  users = 'USERS'
}

@injectable()
export class UserRepository implements IUserRepository {
  public constructor(@inject(UserModel) private userModel: typeof UserModel) { }

  async create(input: IUserEntity): Promise<IUserEntity> {
    const pk = Prefixes.users
    const sk = input.userId

    const result = await this.userModel.create({
      pk,
      sk,
      ...input,
    })

    delete result?.pk
    delete result?.sk
    delete result?.password

    return result
  }

  async get(userId: string): Promise<IUserEntity> {
    const response = await this.userModel.query({
      pk: Prefixes.users,
      sk: userId,
    }).exec()
    const result = response.toJSON()[0]

    delete result?.pk
    delete result?.sk
    delete result?.password

    return result
  }

  async update(updateProps: InputUpdateUserDto): Promise<IUserEntity> {
    const condition = new Condition().where('userId').eq(updateProps.userId)
    const response = await this.userModel.update({
      pk: Prefixes.users,
      sk: updateProps.userId,
    }, {
      ...(updateProps?.name && { name: updateProps.name }),
      ...(updateProps?.birthDate && { birthDate: updateProps.birthDate }),
      ...(updateProps?.gender && { gender: updateProps.gender }),
      ...(updateProps?.password && { password: updateProps.password }),
      ...(updateProps?.cpf && { cpf: updateProps.cpf }),
      ...(updateProps?.email && { email: updateProps.email }),
      ...(updateProps?.phone && { phone: updateProps.phone })
    }, {
      condition: condition
    })

    delete response?.pk
    delete response?.sk
    delete response?.password

    return response
  }

  async delete(userId: string): Promise<boolean> {
    const response = await this.userModel.delete({
      pk: Prefixes.users,
      sk: userId,
    })

    return true
  }
}