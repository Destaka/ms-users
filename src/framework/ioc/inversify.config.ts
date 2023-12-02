import { RepositoryModule } from './repositoryModule'
import { OperatorModule } from './operatorModule'
import { ModelModule } from './modelModule'
import { UseCaseModule } from './useCaseModule'

import { container } from '../shared/ioc/container'
import { ServicesModule } from './servicesModule'

container.load(RepositoryModule)
container.load(ModelModule)
container.load(UseCaseModule)
container.load(OperatorModule)
container.load(ServicesModule)
