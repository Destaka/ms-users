import 'reflect-metadata'
import '../ioc/inversify.config'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

import { httpHandler } from '../utility/httpHandler'
import { container } from '../shared/ioc/container'
import { httpResponse } from '../utility/httpResponse'
import { UserNotFound } from '../../business/module/errors/users'
import { UpdateUserOperator } from '../../controller/operators/updateUserOperator'
import { InputUpdateUser } from '../../controller/serializers/inputUpdateUser'

export const handler = httpHandler(async (event: APIGatewayProxyEvent, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const operator = container.get(UpdateUserOperator)
  const body = JSON.parse(event?.body as string)
  const { birthDate } = body

  const payload = {
    ...body,
    ...(birthDate && { birthDate: new Date(birthDate) })
  }

  console.log('UpdateUser::payload => ', payload)

  const input = new InputUpdateUser(payload)
  const result = await operator.exec(input)

  if (result.isLeft()) {
    if (result.value.code == UserNotFound.code) {
      return httpResponse.notFound(result.value)
    }
    return httpResponse.badRequest(result.value)
  }

  return httpResponse.created(result.value)
})