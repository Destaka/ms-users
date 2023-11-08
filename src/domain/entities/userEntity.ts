import { randomUUID } from 'crypto'

import { Either, right } from '../../framework/shared/either'
import { IError } from '../../framework/shared/iError'
import { AbstractEntity } from './abstractEntity'

export enum GenderTypes {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export interface IUserEntity {
  userId?: string
  name: string
  birthDate: Date
  gender: GenderTypes
  password: string
  cpf: string
  email: string
  phone: string
  emailCheck?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export class UserEntity extends AbstractEntity<IUserEntity> {
  static create(props: IUserEntity): Either<IError, UserEntity> {
    const user = new UserEntity({
      ...props,
      userId: randomUUID(),
    })

    return right(user)
  }
}