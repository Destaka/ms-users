import { injectable, inject } from 'inversify'

import { UserEntity } from '../../domain/entities/userEntity'
import { InputCreateUserDto, OutputCreateUserDto } from '../dto/userDto'
import { IUserRepository, IUserRepositoryToken } from '../repositories/iUserRepository'
import { IIdentityService, IIdentityServiceToken } from '../services/iIdentityService'
import { UserCreationFailed } from '../module/errors/users'
import { left, right } from '../../framework/shared/either'
import { HandlePassword } from './handler/passwordHandler'
import { IUseCase } from './iUseCase'

@injectable()
export class CreateUserUseCase implements IUseCase<InputCreateUserDto, OutputCreateUserDto> {
  public constructor(
    @inject(IUserRepositoryToken) private userRepository: IUserRepository,
    @inject(IIdentityServiceToken) private identityService: IIdentityService,
  ) { }

  async exec(input: InputCreateUserDto): Promise<OutputCreateUserDto> {
    try {
      const handlePassword = new HandlePassword()
      const hashedPassword = handlePassword.hashPassword(input.password)
      const password = hashedPassword

      const userResult = UserEntity.create({
        ...input,
        password,
      })

      if (userResult.isLeft()) {
        return left(UserCreationFailed)
      }

      const user = await this.userRepository.create(userResult.value.export())
      console.log('CreateUserUseCase::user ? ', user)

      if (user?.userId) {
        const createUserIdentity = await this.identityService.createUserIdentity({
          userId: user.userId,
          email: user.email,
          password: input.password,
          name: user.name,
        })
        console.log('createUserIdentity => ', createUserIdentity)

        if (createUserIdentity.isLeft() || !createUserIdentity.value.enabled) {
          await this.userRepository.delete(user.userId)
          throw Error()
        }
      }

      return right(user)
    } catch (error) {
      console.log('CreateUserUseCase::Error ', error)
      return left(UserCreationFailed)
    }
  }
}
