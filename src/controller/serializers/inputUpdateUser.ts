import { IsDate, IsEmail, IsIn, IsMobilePhone, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { GenderTypes, IUserEntity } from '../../domain/entities/userEntity'
import { Either } from '../../framework/shared/either'
import { IError } from '../../framework/shared/iError'
import { Validatable } from './abstractValidatable'

export class InputUpdateUser extends Validatable<InputUpdateUser> {
  @IsNotEmpty()
  @IsUUID()
  userId!: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsDate()
  birthDate?: Date

  @IsOptional()
  @IsIn(Object.values(GenderTypes))
  gender?: GenderTypes

  @IsOptional()
  @IsString()
  password?: string

  @IsOptional()
  @IsString()
  cpf?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsMobilePhone()
  phone?: string
}

export type OutputUpdateUser = Either<IError, IUserEntity>