import { ContainerModule, interfaces } from 'inversify'
import { CreateUserUseCase } from '../../business/useCases/createUserUseCase'
import { GetUserUseCase } from '../../business/useCases/getUserUseCase'
import { UpdateUserUseCase } from '../../business/useCases/updateUserUseCase'

export const UseCaseModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserUseCase).toSelf()
  bind(GetUserUseCase).toSelf()
  bind(UpdateUserUseCase).toSelf()
})