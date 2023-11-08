import { GenderTypes, IUserEntity } from "../../domain/entities/userEntity"
import { Either } from "../../framework/shared/either"
import { IError } from "../../framework/shared/iError"

export interface InputCreateUserDto {
  name: string
  birthDate: Date
  gender: GenderTypes
  password: string
  cpf: string
  email: string
  phone: string
}

export type OutputCreateUserDto = Either<IError, IUserEntity>