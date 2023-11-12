import { ContainerModule, interfaces } from 'inversify'
import { CreateUserOperator } from '../../controller/operators/createUserOperator'
import { GetUserOperator } from '../../controller/operators/getUserOperator'
import { UpdateUserOperator } from '../../controller/operators/updateUserOperator'
import { DeleteUserOperator } from '../../controller/operators/deleteUserOperator'

export const OperatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateUserOperator).toSelf()
  bind(GetUserOperator).toSelf()
  bind(UpdateUserOperator).toSelf()
  bind(DeleteUserOperator).toSelf()
})