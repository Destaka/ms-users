import 'reflect-metadata'
import '../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpHandler } from '../utility/httpHandler'
import { container } from '../shared/ioc/container'
import { httpResponse } from '../utility/httpResponse'
import { GetUserOperator } from '../../controller/operators/getUserOperator'
import { InputGetUser } from '../../controller/serializers/inputGetUser'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {

  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(GetUserOperator)
  const body = event?.pathParameters as Object

  console.log('CreateUser::eventBody => ', body)

  const input = new InputGetUser(body)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.created(result.value)
})