import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'whexpo-application-storage',
  access: (allow: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
    // Handle application uploads (Amplify adds public/ prefix for guest uploads)
    'public/applications/*': [
      allow.guest.to(['read', 'write']),
      allow.authenticated.to(['read', 'write', 'delete'])
    ],
    // Also allow direct applications path for authenticated users
    'applications/*': [
      allow.authenticated.to(['read', 'write', 'delete'])
    ]
  })
}); 