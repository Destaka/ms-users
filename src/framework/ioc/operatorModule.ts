import { ContainerModule, interfaces } from 'inversify'
import { CreateUserOperator } from '../../controller/operators/createUserOperator'
import { GetUserOperator } from '../../controller/operators/getUserOperator'

export const OperatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserOperator).toSelf()
  bind(GetUserOperator).toSelf()
})