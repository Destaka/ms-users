import { injectable, inject } from 'inversify'

import { left, right } from '../../framework/shared/either'
import { IUseCase } from './iUseCase'
import { InputCreateUserDto, OutputCreateUserDto } from '../dto/userDto'
import { UserCreationFailed } from '../module/errors/users'
import { IUserRepository, IUserRepositoryToken } from '../repositories/iUserRepository'
import { UserEntity } from '../../domain/entities/userEntity'

@injectable()
export class CreateUserUseCase implements IUseCase<InputCreateUserDto, OutputCreateUserDto> {
  public constructor(@inject(IUserRepositoryToken) private userRepository: IUserRepository) {}

  async exec(input: InputCreateUserDto): Promise<OutputCreateUserDto> {
    try {
      const userResult = UserEntity.create(input)

      if (userResult.isLeft()) {
        return left(UserCreationFailed)
      }

      const user = await this.userRepository.create(userResult.value.export())
      console.log('CreateUserUseCase::user ? ', user)
      
      return right(user)
    } catch (error) {
      return left(UserCreationFailed)
    }
  }
}