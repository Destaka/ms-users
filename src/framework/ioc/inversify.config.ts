import { RepositoryModule } from './repositoryModule'
import { OperatorModule } from './operatorModule'
import { ModelModule } from './modelModule'
import { UseCaseModule } from './useCaseModule'

import { container } from '../shared/ioc/container'

container.load(RepositoryModule)
container.load(ModelModule)
container.load(UseCaseModule)
container.load(OperatorModule)