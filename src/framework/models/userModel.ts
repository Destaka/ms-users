const dynamoose = require("dynamoose");
import { SchemaDefinition } from 'dynamoose/dist/Schema'

const schema: SchemaDefinition = {
  pk: {
    type: String,
    hashKey: true,
    required: true,
    index: {
      name: 'usersCreatedAt',
      type: 'global',
      rangeKey: 'createdAt',
    }
  },
  sk: {
    type: String,
    rangeKey: true,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false
  },
  cpf: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  }
}

export const UserModel = dynamoose.model('Users', new dynamoose.Schema(schema, { timestamps: true }));