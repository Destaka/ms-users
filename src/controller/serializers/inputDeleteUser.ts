import { IsNotEmpty, IsUUID } from 'class-validator'
import { IUserEntity } from '../../domain/entities/userEntity'
import { Either } from '../../framework/shared/either'
import { IError } from '../../framework/shared/iError'
import { Validatable } from './abstractValidatable'

export class InputDeleteUser extends Validatable<InputDeleteUser> {
  @IsNotEmpty()
  @IsUUID()
  userId!: string
}

export type OutputDeleteUser = Either<IError, IUserEntity>