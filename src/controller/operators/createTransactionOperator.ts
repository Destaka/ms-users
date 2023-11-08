import { injectable, inject } from 'inversify'

import { left, right } from '../../framework/shared/either'
import { AbstractOperator } from './abstractOperator'
import { CreateUserUseCase } from '../../business/useCases/createUserUseCase'
import { InputCreateUser, OutputCreateUser } from '../serializers/inputCreateTransaction'

@injectable()
export class CreateUserOperator extends AbstractOperator<InputCreateUser, OutputCreateUser> {
  public constructor(@inject(CreateUserUseCase) private createUserUseCase: CreateUserUseCase) {
    super()
  }

  protected async run(input: InputCreateUser): Promise<OutputCreateUser> {
    const result = await this.createUserUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}