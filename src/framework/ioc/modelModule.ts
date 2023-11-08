import { ContainerModule, interfaces } from 'inversify'
import { UserModel } from '../models/userModel'

export const ModelModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<typeof UserModel>(UserModel).toConstructor(UserModel)
})
