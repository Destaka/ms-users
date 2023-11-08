import { ContainerModule, interfaces } from 'inversify'
import { CreateUserUseCase } from '../../business/useCases/createUserUseCase'

export const UseCaseModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserUseCase).toSelf()
})