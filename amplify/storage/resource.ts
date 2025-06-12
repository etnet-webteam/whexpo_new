import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'whexpo-application-storage',
  access: (allow: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
    'logos/ai/*': [
      allow.guest.to(['read', 'write']),
      allow.authenticated.to(['read', 'write', 'delete'])
    ],
    'logos/jpeg/*': [
      allow.guest.to(['read', 'write']),
      allow.authenticated.to(['read', 'write', 'delete'])
    ],
    'brand-guidelines/*': [
      allow.guest.to(['read', 'write']),
      allow.authenticated.to(['read', 'write', 'delete'])
    ],
    'supporting-documents/*': [
      allow.guest.to(['read', 'write']),
      allow.authenticated.to(['read', 'write', 'delete'])
    ]
  })
}); 