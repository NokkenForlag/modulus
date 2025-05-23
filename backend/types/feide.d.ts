// types/feide.d.ts

export type FeideUserInfo = {
  sub: string;
  name?: string;
  email?: string;
  given_name?: string;
  family_name?: string;
  [key: string]: any; // Catch-all for other properties
};

export type FeideRole = 'teacher' | 'student' | 'unknown';
