import { defineData } from '@aws-amplify/backend';

const schema = /* GraphQL */ `
  type Application @model
  @auth(rules: [{ allow: private }]) {
    id: ID!
    company: String!
    title: String!
    category: String!
    award: String!
    owner: String
  }
`;

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