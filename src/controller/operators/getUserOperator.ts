import { injectable, inject } from 'inversify'

import { left, right } from '../../framework/shared/either'
import { AbstractOperator } from './abstractOperator'
import { GetUserUseCase } from '../../business/useCases/getUserUseCase'
import { InputGetUser, OutputGetUser } from '../serializers/inputGetUser'

@injectable()
export class GetUserOperator extends AbstractOperator<InputGetUser, OutputGetUser> {
  public constructor(@inject(GetUserUseCase) private getUserUseCase: GetUserUseCase) {
    super()
  }

  protected async run(input: InputGetUser): Promise<OutputGetUser> {
    const result = await this.getUserUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}