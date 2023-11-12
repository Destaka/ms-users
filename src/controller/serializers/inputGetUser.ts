import { IsNotEmpty, IsUUID } from 'class-validator'
import { IUserEntity } from '../../domain/entities/userEntity'
import { Either } from '../../framework/shared/either'
import { IError } from '../../framework/shared/iError'
import { Validatable } from './abstractValidatable'

export class InputGetUser extends Validatable<InputGetUser> {
  @IsNotEmpty()
  @IsUUID()
  userId!: string
}

export type OutputGetUser = Either<IError, IUserEntity>