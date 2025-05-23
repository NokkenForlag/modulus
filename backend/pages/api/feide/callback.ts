import type { NextApiRequest, NextApiResponse } from 'next';
import { getFeideClient } from '../../../lib/feideClient';
import { inferUserRole, debugTokenSet } from '../../../services/authService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await getFeideClient();

    // Extract parameters returned from the authorization server (Feide/Dataporten)
    const params = client.callbackParams(req);

    // Exchange authorization code for tokens
    const tokenSet = await client.callback(
      process.env.FEIDE_REDIRECT_URI!,
      params,
      { state: req.query.state as string }
    );

    // Retrieve user info using the access token
    const userInfo = await client.userinfo(tokenSet.access_token!);

    // Debug tokens
    debugTokenSet(tokenSet);

    // Determine user role
    const role = inferUserRole(userInfo);

    // Redirect to auth bridge page with role
    res.redirect(`/auth-bridge.html?role=${role}`);
  } catch (error) {
    // Log any errors during the authentication process
    console.error('Feide callback error:', error);
    res.status(500).send('Authentication failed');
  }
}