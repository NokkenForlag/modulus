import type { NextApiRequest, NextApiResponse } from 'next';
import { getFeideClient } from '../../../lib/feideClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const feideClient = await getFeideClient();
  const url = feideClient.authorizationUrl({
    scope: 'openid email profile'
  });
  res.redirect(url);
}