// services/authService.ts

import { TokenSet } from 'openid-client';

/**
 * Extracts a basic role (e.g., "teacher" or "student") from Feide userinfo.
 * @param userinfo - The userinfo object returned by the Feide provider.
 */
export function inferUserRole(userinfo: any): 'teacher' | 'student' | 'unknown' {
  if (userinfo && typeof userinfo.email === 'string') {
    const domain = userinfo.email.split('@')[1];
    if (domain?.includes('skole') || domain?.includes('edu')) return 'teacher';
    if (domain?.includes('student')) return 'student';
  }
  return 'unknown';
}

/**
 * Extracts and logs basic details from a TokenSet.
 * @param tokenSet - The token set returned by the client callback.
 */
export function debugTokenSet(tokenSet: TokenSet): void {
  console.log('Access Token:', tokenSet.access_token);
  console.log('ID Token:', tokenSet.id_token);
  console.log('Expires in:', tokenSet.expires_in);
}
