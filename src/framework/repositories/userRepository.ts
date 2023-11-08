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

    return result
  }
}