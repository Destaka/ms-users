import { ContainerModule, interfaces } from 'inversify'
import { CreateUserUseCase } from '../../business/useCases/createUserUseCase'
import { GetUserUseCase } from '../../business/useCases/getUserUseCase'

export const UseCaseModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserUseCase).toSelf()
  bind(GetUserUseCase).toSelf()
})