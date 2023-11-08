import { IsDate, IsEmail, IsIn, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator'
import { GenderTypes, IUserEntity } from '../../domain/entities/userEntity'
import { Either } from '../../framework/shared/either'
import { IError } from '../../framework/shared/iError'
import { Validatable } from './abstractValidatable'

export class InputCreateUser extends Validatable<InputCreateUser> {
  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsDate()
  birthDate!: Date

  @IsNotEmpty()
  @IsIn(Object.values(GenderTypes))
  gender!: GenderTypes

  @IsNotEmpty()
  @IsString()
  password!: string

  @IsNotEmpty()
  @IsString()
  cpf!: string

  @IsNotEmpty()
  @IsEmail()
  email!: string

  @IsNotEmpty()
  @IsMobilePhone()
  phone!: string
}

export type OutputCreateUser = Either<IError, IUserEntity>