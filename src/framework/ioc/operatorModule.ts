import { ContainerModule, interfaces } from 'inversify'
import { CreateUserOperator } from '../../controller/operators/createTransactionOperator'

export const OperatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserOperator).toSelf()
})