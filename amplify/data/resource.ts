import { defineData } from '@aws-amplify/backend';

const schema = /* GraphQL */ `
  type Application @model
  @auth(rules: [{ allow: public }]) {
    id: ID!
    applicationData: AWSJSON!
    createdAt: AWSDateTime!
    updatedAt: AWSDateTime!
    updatedBy: String
  }
`;

// Define the data configuration
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKey: {
      expiresInDays: 365
    }
  }
});