import { injectable, inject } from 'inversify'

import { InputGetUserDto, OutputGetUserDto } from '../dto/userDto'
import { IUserRepository, IUserRepositoryToken } from '../repositories/iUserRepository'
import { left, right } from '../../framework/shared/either'
import { IUseCase } from './iUseCase'
import { UserNotFound, UserReadingFailed } from '../module/errors/users'

@injectable()
export class GetUserUseCase implements IUseCase<InputGetUserDto, OutputGetUserDto> {
  public constructor(@inject(IUserRepositoryToken) private userRepository: IUserRepository) {}

  async exec(input: InputGetUserDto): Promise<OutputGetUserDto> {
    try {
      const user = await this.userRepository.get(input.userId)
      console.log('GetUserUseCase::user ? ', user)

      if (!user) {
        return left(UserNotFound)
      }

      return right(user);
    } catch (error) {
      console.log('GetUserUseCase::Error ', error)

      return left(UserReadingFailed)
    }
  }
}