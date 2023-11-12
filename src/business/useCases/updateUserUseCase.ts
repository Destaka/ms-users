import { injectable, inject } from 'inversify'

import { left, right } from '../../framework/shared/either'
import { IUseCase } from './iUseCase'
import { InputUpdateUserDto, OutputUpdateUserDto } from '../dto/userDto'
import { UserNotFound, UserUpdateFailed } from '../module/errors/users'
import { IUserRepository, IUserRepositoryToken } from '../repositories/iUserRepository'
import { HandlePassword } from './handler/passwordHandler'

@injectable()
export class UpdateUserUseCase implements IUseCase<InputUpdateUserDto, OutputUpdateUserDto> {
  public constructor(@inject(IUserRepositoryToken) private userRepository: IUserRepository) {}

  async exec(input: InputUpdateUserDto): Promise<OutputUpdateUserDto> {
    try {
      const handlePassword = new HandlePassword()

      const user = await this.userRepository.update({
        userId: input.userId,
        name: input.name,
        birthDate: input.birthDate,
        gender: input.gender,
        ...(input.password && { password: handlePassword.hashPassword(input.password) }),
        cpf: input.cpf,
        email: input.email,
        phone: input.phone
      })

      if (!user) return left(UserNotFound)
     
      console.log('UpdateUserUseCase::user ? ', user)
      return right(user)
    } catch (error) {
      console.log('UpdateUserUseCase::Error ', error)
      return left(UserUpdateFailed)
    }
  }
}