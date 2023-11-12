import { inject, injectable } from "inversify"

import { UserModel } from "../models/userModel"
import { IUserEntity } from "../../domain/entities/userEntity"
import { IUserRepository } from "../../business/repositories/iUserRepository"

enum Prefixes {
  users = 'USERS'
}

@injectable()
export class UserRepository implements IUserRepository {
  public constructor(@inject(UserModel) private userModel: typeof UserModel) { }
  private readonly pk = Prefixes.users

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
      pk: this.pk,
      sk: userId,
    }).exec()
    const result = response.toJSON()[0]

    delete result?.pk
    delete result?.sk
    delete result?.password

    return result
  }
}