import type { NextApiRequest, NextApiResponse } from 'next';
import { getFeideClient } from '../../../lib/feideClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const feideClient = await getFeideClient();
  const params = feideClient.callbackParams(req);

  try {
    const tokenSet = await feideClient.callback(process.env.FEIDE_REDIRECT_URI as string, params);
    const userinfo = await feideClient.userinfo(tokenSet.access_token as string);
    res.status(200).json({ message: 'Login successful', userinfo });
  } catch (error) {
    console.error('OIDC callback error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
}