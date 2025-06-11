import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'whexpo-application-storage',
  access: (allow) => ({
    'logos/ai/*': [
      allow.authenticated.to(['read', 'write', 'delete'])
    ],
    'logos/jpeg/*': [
      allow.authenticated.to(['read', 'write', 'delete'])
    ],
    'brand-guidelines/*': [
      allow.authenticated.to(['read', 'write', 'delete'])
    ],
    'supporting-documents/*': [
      allow.authenticated.to(['read', 'write', 'delete'])
    ]
  })
}); 