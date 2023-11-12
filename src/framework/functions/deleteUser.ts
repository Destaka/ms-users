import 'reflect-metadata'
import '../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpHandler } from '../utility/httpHandler'
import { container } from '../shared/ioc/container'
import { httpResponse } from '../utility/httpResponse'
import { DeleteUserOperator } from '../../controller/operators/deleteUserOperator'
import { InputDeleteUser } from '../../controller/serializers/inputDeleteUser'
import { UserNotFound } from '../../business/module/errors/users'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(DeleteUserOperator)
  const body = event?.pathParameters as Object

  console.log('DeleteUser::eventBody => ', body)

  const input = new InputDeleteUser(body)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    if (result.value.code == UserNotFound.code) {
      return httpResponse.notFound(result.value)
    }
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.ok(result.value)
})