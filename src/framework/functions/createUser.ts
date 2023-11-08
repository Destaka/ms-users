import 'reflect-metadata'
import '../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpHandler } from '../utility/httpHandler'
import { httpResponse } from '../utility/httpResponse'
import { container } from '../shared/ioc/container'
import { CreateUserOperator } from '../../controller/operators/createTransactionOperator'
import { InputCreateUser } from '../../controller/serializers/inputCreateTransaction'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(CreateUserOperator)
  const body = JSON.parse(event?.body as string)
  const { birthDate } = body

  const payload = {
    ...body,
    ...(birthDate && { birthDate: new Date(birthDate) })
  }

  console.log('payload => ', payload)

  const input = new InputCreateUser(payload)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.created(result.value)
})