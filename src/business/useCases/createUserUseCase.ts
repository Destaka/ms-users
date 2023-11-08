import { injectable, inject } from 'inversify'

import { left, right } from '../../framework/shared/either'
import { IUseCase } from './iUseCase'
import { InputCreateUserDto, OutputCreateUserDto } from '../dto/userDto'
import { UserCreationFailed } from '../module/errors/users'
import { IUserRepository, IUserRepositoryToken } from '../repositories/iUserRepository'

@injectable()
export class CreateUserUseCase implements IUseCase<InputCreateUserDto, OutputCreateUserDto> {
  public constructor(@inject(IUserRepositoryToken) private userRepository: IUserRepository) {}

  async exec(input: InputCreateUserDto): Promise<OutputCreateUserDto> {
    try {
      const user = await this.userRepository.create(input)
      
      return right(user)
    } catch (error) {
      return left(UserCreationFailed)
    }
  }
}