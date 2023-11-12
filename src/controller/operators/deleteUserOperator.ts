import { injectable, inject } from 'inversify'

import { left, right } from '../../framework/shared/either'
import { AbstractOperator } from './abstractOperator'
import { DeleteUserUseCase } from '../../business/useCases/deleteUserUseCase'
import { InputDeleteUser, OutputDeleteUser } from '../serializers/inputDeleteUser'

@injectable()
export class DeleteUserOperator extends AbstractOperator<InputDeleteUser, OutputDeleteUser> {
  public constructor(@inject(DeleteUserUseCase) private deleteUserUseCase: DeleteUserUseCase) {
    super()
  }

  protected async run(input: InputDeleteUser): Promise<OutputDeleteUser> {
    const result = await this.deleteUserUseCase.exec(input)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(result.value)
  }
}