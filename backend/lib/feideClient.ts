import { Issuer, Client } from 'openid-client';

let cachedClient: Client | null = null;

export async function getFeideClient(): Promise<Client> {
  if (cachedClient) return cachedClient;

  const feideIssuer = await Issuer.discover('https://auth.dataporten.no');

  if (!process.env.FEIDE_CLIENT_ID || !process.env.FEIDE_CLIENT_SECRET || !process.env.FEIDE_REDIRECT_URI) {
    throw new Error('Missing FEIDE_CLIENT_ID, FEIDE_CLIENT_SECRET or FEIDE_REDIRECT_URI in environment');
  }

  cachedClient = new feideIssuer.Client({
    client_id: process.env.FEIDE_CLIENT_ID,
    client_secret: process.env.FEIDE_CLIENT_SECRET,
    redirect_uris: [process.env.FEIDE_REDIRECT_URI],
    response_types: ['code']
  });

  return cachedClient;
}