import { injectable, inject } from 'inversify'

import { left, right } from '../../framework/shared/either'
import { IUseCase } from './iUseCase'
import { InputCreateUserDto, OutputCreateUserDto } from '../dto/userDto'
import { UserCreationFailed } from '../module/errors/users'
import { IUserRepository, IUserRepositoryToken } from '../repositories/iUserRepository'
import { UserEntity } from '../../domain/entities/userEntity'
import { HandlePassword } from './handler/passwordHandler'

@injectable()
export class CreateUserUseCase implements IUseCase<InputCreateUserDto, OutputCreateUserDto> {
  public constructor(@inject(IUserRepositoryToken) private userRepository: IUserRepository) {}

  async exec(input: InputCreateUserDto): Promise<OutputCreateUserDto> {
    try {
      const handlePassword = new HandlePassword()
      const hashedPassword = handlePassword.hashPassword(input.password)
      input.password = hashedPassword

      const userResult = UserEntity.create(input)

      if (userResult.isLeft()) {
        return left(UserCreationFailed)
      }

      const user = await this.userRepository.create(userResult.value.export())

      console.log('CreateUserUseCase::user ? ', user)
      return right(user)
    } catch (error) {
      console.log('CreateUserUseCase::Error ', error)
      return left(UserCreationFailed)
    }
  }
}