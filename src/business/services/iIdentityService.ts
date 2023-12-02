import { Either } from "../../framework/shared/either"
import { IError } from "../../framework/shared/iError"

export const IIdentityServiceToken = Symbol.for('IIdentityService')

export interface IUserIdentity {
  userId: string
  email: string
  password: string
  name: string
}

export interface IUserIdentityResponse {
  email: string
  enabled: boolean
}

export interface IIdentityService {
  createUserIdentity(userEntity: IUserIdentity): Promise<Either<IError, IUserIdentityResponse>>
}
