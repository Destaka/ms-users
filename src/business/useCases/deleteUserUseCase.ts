import { injectable, inject } from 'inversify'

import { InputDeleteUserDto, OutputDeleteUserDto } from '../dto/userDto'
import { IUserRepository, IUserRepositoryToken } from '../repositories/iUserRepository'
import { left, right } from '../../framework/shared/either'
import { IUseCase } from './iUseCase'
import { UserDeletionFailed, UserNotFound } from '../module/errors/users'

@injectable()
export class DeleteUserUseCase implements IUseCase<InputDeleteUserDto, OutputDeleteUserDto> {
  public constructor(@inject(IUserRepositoryToken) private userRepository: IUserRepository) {}

  async exec(input: InputDeleteUserDto): Promise<OutputDeleteUserDto> {
    try {
      const getResponse = await this.userRepository.get(input.userId)
      console.log('DeleteUserUseCase::getResponse ? ', getResponse)

      if (!getResponse) {
        return left(UserNotFound)
      }

      const deleteResponse = await this.userRepository.delete(input.userId)
      console.log('DeleteUserUseCase::deleteResponse ? ', deleteResponse)

      return right(deleteResponse);
    } catch (error) {
      console.log('DeleteUserUseCase::Error ', error)
      return left(UserDeletionFailed)
    }
  }
}