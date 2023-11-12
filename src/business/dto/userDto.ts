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

export interface InputGetUserDto {
  userId: string
}

export interface InputUpdateUserDto {
  userId: string
  name?: string
  birthDate?: Date
  gender?: GenderTypes
  password?: string
  cpf?: string
  email?: string
  phone?: string
}

export interface InputDeleteUserDto {
  userId: string
}

export type OutputCreateUserDto = Either<IError, IUserEntity>
export type OutputGetUserDto = Either<IError, IUserEntity>
export type OutputUpdateUserDto = Either<IError, IUserEntity>
export type OutputDeleteUserDto = Either<IError, boolean>