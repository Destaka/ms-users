import { injectable, inject } from 'inversify'

import { left, right } from '../../framework/shared/either'
import { AbstractOperator } from './abstractOperator'
import { UpdateUserUseCase } from '../../business/useCases/updateUserUseCase'
import { InputUpdateUser, OutputUpdateUser } from '../serializers/inputUpdateUser'

@injectable()
export class UpdateUserOperator extends AbstractOperator<InputUpdateUser, OutputUpdateUser> {
  public constructor(@inject(UpdateUserUseCase) private updateUserUseCase: UpdateUserUseCase) {
    super()
  }

  protected async run(input: InputUpdateUser): Promise<OutputUpdateUser> {
    const result = await this.updateUserUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}