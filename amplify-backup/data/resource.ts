import { a, defineData } from '@aws-amplify/backend';

// Define your schema
const schema = a.schema({
  Application: a
    .model({
      id: a.string().required(),
      company: a.string().required(),
      title: a.string().required(),
      category: a.string().required(),
      award: a.string().required(),
    })
    .authorization([a.allow.owner().to(['read', 'create', 'update', 'delete'])]),
});

// Define the Schema type
export type Schema = ReturnType<typeof schema>;

// Define the data configuration
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    userPool: {
      useEnv: 'USERPOOL',
    }
  }
});